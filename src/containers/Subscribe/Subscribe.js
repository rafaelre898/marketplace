import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { SubscribeForm } from './SubscribeForm'
import {
  Dialog,
} from '@material-ui/core'
import useStyles from './styles'
import { authInfo } from 'helpers/localCheck'
import { Loader } from 'components/Loader'
import { isSubscribeLoadingSelector } from 'redux/modules/global/selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'

const Subscribe = ({
  open,
  onClose,
  info,
  isSubscribeLoading,
}) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const fullScreen = useMediaQuery({ maxWidth: 600 })
  const [isLogedin, setIsLogedin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setModalOpen(open)
    if (isSubscribeLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
      setIsLogedin(authInfo().tokens ? true : false)
    }
  }, [open, isSubscribeLoading])

  const handleClose = () => {
    if (!isLoading) {
      setModalOpen(false)
      onClose()
    }
  }
  return (
    <>
      <Dialog
        className={classes.root}
        fullScreen={fullScreen}
        scroll='body'
        open={modalOpen}
        onClose={handleClose}
        maxWidth='xl'
      >
        {isLoading && <Loader />}
        <SubscribeForm onClose={handleClose} info={info} isLogedin={isLogedin} />
      </Dialog>
    </>
  )
}

Subscribe.propTypes = {
  isSubscribeLoading: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  info: PropTypes.any,
}

const selector = createStructuredSelector({
  isSubscribeLoading: isSubscribeLoadingSelector
})

export default compose(connect(selector, null))(Subscribe)
