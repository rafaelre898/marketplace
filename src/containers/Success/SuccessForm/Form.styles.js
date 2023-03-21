import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    width: '100%',
    '@media only screen and (max-width: 600px)': {
      height: 'calc(100vh - 304px)',
    }
  },
  successImg: {
    width: '100%',
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
      textAlign: 'left',
    }
  },
  description: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'left',
    }
  },
  signButton: {
    height: theme.spacing(4),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buttonCenterArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
