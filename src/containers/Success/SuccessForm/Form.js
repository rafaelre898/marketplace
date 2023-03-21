import React from 'react'
import useStyles from './Form.styles'
import {
  Container,
} from '@material-ui/core'
import { CustomButton } from 'components/CustomButton'
import successImg from 'assets/images/background/success.svg'
import { useHistory } from 'react-router-dom'

const Form = ({ onClose, customInfo }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleBrowse = () => {
    history.push('/search?mode=Icons')
    onClose()
  }

  return (
    <>
      <div className={classes.root}>
        <Container>
          <img src={customInfo ? customInfo.img : successImg} alt='success' className={classes.successImg} />
          <div className={classes.title}>
            {customInfo ? customInfo.title : 'You did it! Now you can enjoy Animatly!'}
          </div>
          <div className={classes.description}>
            {
              customInfo ? customInfo.description :
                `You have 32 Icons and 6 Illustrations you can customize and downlaod for free.`
            }
          </div>
          <div className={classes.buttonCenterArea}>
            <CustomButton
              content='Browse animations'
              type='filled'
              className={classes.signButton}
              onClick={handleBrowse}
            />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Form
