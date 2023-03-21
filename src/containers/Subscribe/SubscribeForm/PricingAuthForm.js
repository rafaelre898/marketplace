import React, { useEffect, useState } from 'react'
import useStyles from './PricingAuthForm.styles'
import {
  Container,
  Divider,
} from '@material-ui/core'
import { CustomInput } from 'components/CustomInput'
import { Mobile, Default } from 'containers/ResponseLayout'
import {
  setSigninOpen,
  setSubscribeOpen,
} from 'redux/modules/global/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { checkEmailValidation } from 'redux/modules/auth/actions'
import { validator } from 'helpers/validator'
import { cloneDeep } from 'lodash'

const PrcingAuthForm = ({
  title,
  description,
  setSigninOpen,
  setSubscribeOpen,
  checkEmailValidation,
  errorShow,
  onChangeValidStatus,
  onInfoChange,
}) => {
  const classes = useStyles()
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', password: '' })
  const [validation, setValidation] = useState([
    'This field must be required.', 'This field must be required.', 'This field must be required.'])

  const handleLogin = () => {
    setSigninOpen({ open: true })
    setSubscribeOpen({ open: false })
  }

  const handleChange = async (key, value) => {
    const res = Object.assign({}, customerInfo, { [key]: value })
    setCustomerInfo(res)

    let validation_res = cloneDeep(validation)
    validation_res[0] = validator(res.name, ['require'])
    const emailValidText = validator(res.email, ['require', 'email'])
    if (key === 'email') {
      validation_res[1] = emailValidText
    }
    validation_res[2] = validator(res.password, ['require', 'password'])
    !emailValidText && key === 'email' && await emailValidation(res.email)

    setValidation(validation_res)
  }

  useEffect(() => {
    onInfoChange(customerInfo)
  }, [customerInfo, onInfoChange])

  useEffect(() => {
    const validStatus = validation.filter(item => item)
    const isValid = validStatus.length === 0 ? true : false
    onChangeValidStatus(isValid)
  }, [validation, onChangeValidStatus])

  const emailValidation = async (email) => {
    await checkEmailValidation({
      body: { email },
      success: ({ data }) => { },
      fail: (err) => {
        if (err.status === 400) {
          const error = err.data.message
          let validation_res = validation
          validation_res[1] = error
          setValidation(validation_res)
        }
      }
    })
  }

  return (
    <div className={classes.root}>
      <Container className={classes.contentArea}>
        <Mobile>
          <div className={classes.headerTitle}>Let's Go!</div>
        </Mobile>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
        <div className={classes.inputArea}>
          <CustomInput
            placeholder='Full name'
            onChange={value => handleChange('name', value)}
            hasError={errorShow && validation[0]}
          />
          <CustomInput
            placeholder='E-Mail'
            onChange={value => handleChange('email', value)}
            hasError={errorShow && validation[1]}
          />
          <CustomInput
            placeholder='Password'
            type='password'
            onChange={value => handleChange('password', value)}
            hasError={errorShow && validation[2]}
          />
        </div>
      </Container >
      <Default>
        <div className={classes.bottomArea}>
          <Divider className={classes.divider} />
          <div className={classes.label}>
            Already a member? <span onClick={handleLogin}>Sign In</span>
          </div>
        </div>
      </Default>
    </div>
  )
}

PrcingAuthForm.propTypes = {
  setSigninOpen: PropTypes.func,
  setSubscribeOpen: PropTypes.func,
  onInfoChange: PropTypes.func,
  checkEmailValidation: PropTypes.func,
  errorShow: PropTypes.any,
}

const actions = {
  setSigninOpen,
  setSubscribeOpen,
  checkEmailValidation,
}

export default compose(connect(null, actions))(PrcingAuthForm)

