import React from 'react'
import { CloseModal } from 'components/CloseModal'
import { Mobile, Default } from 'containers/ResponseLayout'
import Form from './Form'
import { MobileHeader } from 'containers/Header'
import { MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import useStyles from './SuccessForm.styles'

const SuccessForm = ({ onClose, customInfo }) => {
  const classes = useStyles()

  return (
    <>
      <Mobile>
        <MobileHeader onClickUser={onClose} />
        <PageHeader />
        <Form onClose={onClose} customInfo={customInfo} />
        <MobileFooter />
      </Mobile>

      <Default>
        <CloseModal
          onClose={onClose}
          className={classes.root}
        >
          <Form onClose={onClose} customInfo={customInfo} />
        </CloseModal>
      </Default>
    </>
  )
}

export default SuccessForm
