import React, { useState } from 'react'
import useStyles from './Form.styles'
import {
  Container,
  Divider,
  Radio,
  FormControlLabel,
  RadioGroup,
  withStyles
} from '@material-ui/core'
import { CustomButton } from 'components/CustomButton'
import { useHistory } from 'react-router-dom'
import {
  setSigninOpen,
  setSubscribeOpen,
  setSuccessOpen,
  setIsSubscribeLoading,
} from 'redux/modules/global/actions'
import {
  createStripeSubscription,
  updateStripeSubscription,
  createPaypalSubscription,
  updatePaypalSubscription,
} from 'redux/modules/subscribe/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import paypalImg from 'assets/images/Icon/paypal.png'
import stripeImg from 'assets/images/Icon/stripe.png'
import subscriptionImg from 'assets/images/background/subscription.svg'
import StripeCardNumber from 'components/StripeCardNumber'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Mobile, Default } from 'containers/ResponseLayout'
import * as cx from 'classnames'
import { CustomAlert } from 'components/CustomAlert'
import { CustomPaypalButton, FakePaypalButton } from 'components/CustomPaypalButton'
import { signup, refresh } from 'redux/modules/auth/actions'
import { authInfo } from 'helpers/localCheck'
import moment from 'moment'

const Form = ({
  info,
  setSubscribeOpen,
  setSuccessOpen,
  setIsSubscribeLoading,
  createStripeSubscription,
  updateStripeSubscription,
  createPaypalSubscription,
  updatePaypalSubscription,
  signup,
  refresh,
  setSigninOpen,
  onClickSubscribe,
  isValid,
  customerInfo,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const userInfo = authInfo().user
  const isForUpgrade = (!userInfo || userInfo.role === 'freeUser') ? false : true
  const stripe = useStripe()
  const elements = useElements()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [selectedRadio, setSelectedRaidio] = useState(
    (userInfo && userInfo.paymentMethod) ? userInfo.paymentMethod : 'paypal')

  const handleRadioChange = (event) => {
    setSelectedRaidio(event.target.value)
  }

  const handleA = (url) => () => {
    setSubscribeOpen({ open: false, subscribeInfo: null })
    history.push(url)
  }

  const handleSubscribe = async () => {
    if (isValid) {
      setIsSubscribeLoading({ isLoading: true })
      !userInfo && handleSignup()

      if (!stripe || !elements) { return }
      const cardElement = elements.getElement(CardElement)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      if (error) {
        setAlertText(error.message)
        setAlertOpen(true)
        setIsSubscribeLoading({ isLoading: false })
      } else {
        const paymentMethodId = paymentMethod.id
        stripeSubscription(paymentMethodId)
      }

    } else {
      onClickSubscribe()
    }
  }

  const handlePayPalClick = () => {
    setIsSubscribeLoading({ isLoading: true })
    !userInfo && handleSignup()
  }

  const handleClickFakePaypalButton = () => {
    onClickSubscribe()
  }

  const handlePaypalSuccess = (data) => {
    paypalSubscription(data)
  }

  const handleCancelPaypal = () => {
    setAlertText('Paypal processing Canceled!')
    setAlertOpen(true)
    setIsSubscribeLoading({ isLoading: false })
  }

  const paypalSubscription = async (data) => {
    const { email } = customerInfo
    const mode = isForUpgrade ? 'upgrade' : 'create'

    await createPaypalSubscription({
      body: {
        email,
        paypal_subscription_id: data.id,
        payer_id: data.subscriber.payer_id,
        startDate: data.start_time,
        current_period_start: data.update_time,
        current_period_end: moment(data.update_time).add(1, 'year'),
        licensePackageId: info.id,
        status: data.status,
        mode,
      },
      success: ({ data }) => {
        refreshUser()
      },
      fail: (err) => {
        setAlertText(err.data.message)
        setAlertOpen(true)
        setIsSubscribeLoading({ isLoading: false })
      }
    })
  }

  const stripeSubscription = async (paymentMethodId) => {
    const priceId = info.priceId
    const licensePackageId = info.id
    const { email, name } = customerInfo
    const mode = isForUpgrade ? 'upgrade' : 'create'

    await createStripeSubscription({
      body: { email, name, priceId, paymentMethodId, licensePackageId, mode },
      success: ({ data }) => {
        refreshUser()
      },
      fail: ({ data }) => {
        setAlertText(data.message)
        setAlertOpen(true)
        setIsSubscribeLoading({ isLoading: false })
      }
    })
  }

  const handleSignup = async () => {
    const { email, name, password } = customerInfo
    await signup({ body: { name, password, email } })
  }

  const refreshUser = async () => {
    await refresh({
      success: ({ data }) => {
        setIsSubscribeLoading({ isLoading: false })
        setSubscribeOpen({ open: false, subscribeInfo: null })
        setSuccessOpen({
          open: true,
          customInfo: {
            img: subscriptionImg,
            title: 'You are now part of the Animatly family!',
            description: `Congratulations, you made the right decision!
             You now have unlimited access to our ${info.text} library.`
          }
        })
      },
    })
  }

  const handleLogin = () => {
    setSigninOpen({ open: true })
    setSubscribeOpen({ open: false })
  }

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Default>
            <div className={classes.title}>Your plan</div>
          </Default>

          <Divider className={classes.divider} />
          <Default>
            <div className={classes.packageArea}>
              <div className={classes.packageText}>Your Plan: <span>{info && info.title}</span></div>
              <CustomButton
                content='Change plan'
                type='outLine'
                className={classes.changePlanButton}
                onClick={handleA('/pricing')}
              />
            </div>
            <div className={classes.contentHeaderArea}>
              <div className={classes.value}>{info && info.value}</div>
              <div className={classes.descriptionArea}>
                <div className={classes.valueDescription}>/year (billed annually)</div>
              </div>
            </div>
          </Default>
          <Mobile>
            <div className={classes.packageArea}>
              <div className={classes.packageText}>Your Plan: <span>{info && info.title}</span></div>
              <div className={classes.contentHeaderArea}>
                <div className={classes.value}>{info && info.value}</div>
                <div className={classes.descriptionArea}>
                  <div className={classes.valueDescription}>/year (billed annually)</div>
                </div>
              </div>
            </div>
            <CustomButton
              content='Change plan'
              type='outLine'
              className={classes.changePlanButton}
              onClick={handleA('/pricing')}
            />
          </Mobile>

          <Divider className={classes.divider} />
          <div className={classes.label}>Payment method:</div>
          <div className={classes.paymentMethod}>
            <RadioGroup
              name='gender1'
              value={selectedRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value='paypal'
                control={<CustomRadio className={classes.radio} disableRipple />}
                label={
                  <div style={{ display: 'flex' }}>
                    <div className={classes.paymentTex}>PayPal</div>
                    <img className={classes.paymentImg} src={paypalImg} alt='paypal' />
                  </div>
                }
                disabled={userInfo && userInfo.paymentMethod ? true : false}
              />
              <FormControlLabel
                value='stripe'
                control={<CustomRadio className={classes.radio} disableRipple />}
                label={
                  <div style={{ display: 'flex' }}>
                    <div className={classes.paymentTex} >Credit or debit card.</div>
                    <img className={classes.paymentImg} src={stripeImg} alt='stripe' />
                  </div>
                }
                disabled={userInfo && userInfo.paymentMethod ? true : false}
              />
            </RadioGroup>
          </div>
          <div className={cx(selectedRadio === 'stripe' && classes.cardNumber)}>
            {
              selectedRadio === 'stripe' &&
              <div style={{ width: '100%' }}>
                <StripeCardNumber />
              </div>
            }
          </div>
          <Divider className={classes.divider} />
          <div className={classes.label1}>
            <div className={classes.label2}>Transactions are encrypted and secured</div>
            <div className={classes.label3}>Total: {info && info.value}</div>
          </div>

          <div className={classes.buttonCenterArea}>
            {
              selectedRadio === 'stripe'
                ?
                <CustomButton
                  content='Subscribe'
                  type='filled'
                  className={classes.subscribe}
                  onClick={handleSubscribe}
                />
                :
                <>
                  {
                    !isValid &&
                    <FakePaypalButton onClick={handleClickFakePaypalButton} />
                  }
                  <div hidden={!isValid}>
                    <CustomPaypalButton
                      info={info}
                      onClick={handlePayPalClick}
                      onSuccess={handlePaypalSuccess}
                      onCancel={handleCancelPaypal}
                    />
                  </div>
                </>
            }
          </div>
          <Default>
            <div className={classes.footerText}>
              By joining, you agree to <span >
                <a
                  className={classes.link}
                  href='/content/Animatly_LicenseAgreement.pdf'
                  target="_blank"
                >Terms of Use</a></span> and
              <span>
                <a
                  className={classes.link}
                  href='/content/Privacy-Policy-Animatly.pdf'
                  target="_blank"
                > Privacy Policy</a></span>
            </div>
          </Default>
        </Container>

        <Mobile>
          <div style={{ width: '100%' }}>
            <Divider className={classes.divider} />
            <div className={classes.labelSignin}>
              Already a member? <span onClick={handleLogin}>Sign In</span>
            </div>
          </div>
        </Mobile>
      </div>
      <CustomAlert isOpen={alertOpen} type='error' text={alertText} onClose={() => setAlertOpen(false)} />
    </>
  )
}

Form.propTypes = {
  setSubscribeOpen: PropTypes.func,
  setSuccessOpen: PropTypes.func,
  setIsSubscribeLoading: PropTypes.func,
  createStripeSubscription: PropTypes.func,
  updateStripeSubscription: PropTypes.func,
  createPaypalSubscription: PropTypes.func,
  updatePaypalSubscription: PropTypes.func,
  setSigninOpen: PropTypes.func,
  signup: PropTypes.func,
  refresh: PropTypes.func,
  onClickSubscribe: PropTypes.func,
  isValid: PropTypes.bool,
}

const actions = {
  setSubscribeOpen,
  setSuccessOpen,
  setIsSubscribeLoading,
  createStripeSubscription,
  updateStripeSubscription,
  createPaypalSubscription,
  updatePaypalSubscription,
  setSigninOpen,
  signup,
  refresh,
}

export default compose(connect(null, actions))(Form)

const CustomRadio = withStyles({
  root: {
    color: 'default',
    '&$checked': {
      color: '#333333',
    },
    padding: '4px',
  },
  checked: {},
})((props) => <Radio color='default' {...props} />)
