import React, { useEffect, useState } from 'react'
import { CloseModal } from 'components/CloseModal'
import { Mobile, Default } from 'containers/ResponseLayout'
import Form from './Form'
import { MobileHeader } from 'containers/Header'
import { MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import { HighLightSection } from 'components/HighLightSection'
import PrcingAuthForm from './PricingAuthForm'
import useStyles from './SubscribeForm.styles'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from 'helpers/utils'
import { authInfo } from 'helpers/localCheck'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const SubscribeForm = ({ onClose, info, isLogedin }) => {
  const classes = useStyles()
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' })
  const [validStatus, setValidStatus] = useState(false)
  const [errorShow, setErrorShow] = useState(false)
  const [extendComponent, setExtendComponent] = useState(null)

  useEffect(() => {
    if (authInfo().user) {
      const { name, email, id, role, paymentMethod } = authInfo().user
      setValidStatus(true)
      setUserInfo(prev => {
        return Object.assign(prev, { name, email, id, role, paymentMethod })
      })
    }
  }, [setUserInfo, setValidStatus])

  const handleClickSubscribe = () => {
    setErrorShow(true)
  }

  useEffect(() => {
    const handleChangeValidStatus = (status) => {
      setValidStatus(status)
    }

    const hanldeInfoChange = (value) => {
      setUserInfo(prev => {
        return Object.assign(prev, value)
      })
    }

    setExtendComponent(isLogedin
      ?
      <HighLightSection
        title={info && info.subheader}
        description='Beautify your interactive projects in a few clicks.'
      />
      :
      <PrcingAuthForm
        title={info && info.subheader}
        description='Beautify your interactive projects in a few clicks.'
        onInfoChange={hanldeInfoChange}
        errorShow={errorShow}
        onChangeValidStatus={handleChangeValidStatus}
      />
    )
  }, [isLogedin, info, errorShow])

  return (
    <>
      <Mobile>
        <MobileHeader />
        <PageHeader className={classes.smallHeader} />
        {!isLogedin && extendComponent}
        <Elements stripe={stripePromise}>
          <Form
            info={info}
            customerInfo={userInfo}
            isValid={validStatus}
            onClickSubscribe={handleClickSubscribe}
          />
        </Elements>
        <div style={{
          height: '150px'
        }}></div>
        <MobileFooter />
      </Mobile>

      <Default>
        <CloseModal
          onClose={onClose}
          extend={extendComponent}
          className={classes.root}
        >
          <Elements stripe={stripePromise}>
            <Form
              info={info}
              customerInfo={userInfo}
              isValid={validStatus}
              onClickSubscribe={handleClickSubscribe}
            />
          </Elements>
        </CloseModal>
      </Default>
    </>
  )
}

export default SubscribeForm
