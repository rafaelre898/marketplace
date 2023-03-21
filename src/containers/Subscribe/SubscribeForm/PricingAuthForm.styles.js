import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    '@media only screen and (max-width: 600px)': {
      height: 'auto'
    }
  },
  contentArea: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: 'calc(100% - 40px)',
    '@media only screen and (max-width: 600px)': {
      paddingBottom: 0,
      height: 'calc(100% - 52px)',

    }
  },
  loginButton: {
    width: '100%',
    height: '40px',
    marginBottom: theme.spacing(1.5),
  },
  bottomArea: {
    bottom: '0px',
    '@media only screen and (max-width: 600px)': {
      width: '100%',
      position: 'absolute',
      bottom: '-50px',

    }
  },
  headerTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '26px',
    lineHeight: '30px',
    marginBottom: theme.spacing(1),
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    '@media only screen and (max-width: 600px)': {
      marginBottom: theme.spacing(0),
      fontSize: '14px',
      lineHeight: '16px',
    }
  },
  description: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    marginBottom: theme.spacing(3),
  },
  divider: {
    marginBottom: '12px !important',
  },
  label: {
    color: '#333333',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
    '& > span': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#0052FF'
    },
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
    }
  },
  inputArea: {
    textAlign: 'left'
  }
}))
