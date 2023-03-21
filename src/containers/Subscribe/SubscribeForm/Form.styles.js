import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    width: '100%',
    '@media only screen and (max-width: 600px)': {
    }
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
      textAlign: 'left',
    }
  },
  labelSignin: {
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
  divider: {
    marginTop: '16px !important',
    marginBottom: '16px !important',
  },
  packageArea: {
    height: '30px',
    marginBottom: theme.spacing(1),
    '@media only screen and (max-width: 600px)': {
      height: 'auto',
    }
  },
  packageText: {
    float: 'left',
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    width: '152px',
    '& > span': {
      fontWeight: 'bold',
    },
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
      width: '100%',
      float: 'none',
      marginBottom: theme.spacing(1),
    }
  },
  changePlanButton: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    float: 'right',
    '@media only screen and (max-width: 600px)': {
      float: 'none',
    }

  },
  contentHeaderArea: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  value: {
    color: '#333333',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px',
    marginRight: theme.spacing(0.5)
  },
  descriptionArea: {
    position: 'relative',
    width: '100%',
    height: '25px',
  },
  valueDescription: {
    color: '#333333',
    fontWeight: '5000',
    fontSize: '12px',
    lineHeight: '14px',
    bottom: '0px',
    position: 'absolute',
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
    }
  },
  label1: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
    }
  },
  label2: {
    float: 'left',
    textAlign: 'left',
  },
  label3: {
    textAlign: 'right',
    float: 'right',
    fontWeight: 'bold',
  },
  buttonCenterArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(4),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    '@media only screen and (max-width: 600px)': {
      height: '46px',
    }
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#0052FF'
  },
  subscribe: {
    height: theme.spacing(4),
    width: theme.spacing(15),
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    '@media only screen and (max-width: 600px)': {
      fontSize: '16px',
      lineHeight: '19px',
      height: '46px',
      width: '100%',
    }
  },
  footerText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: '10px',
    lineHeight: '12px',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    '& > span': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    '@media only screen and (max-width: 600px)': {
      fontSize: '12px',
      lineHeight: '14px',
      marginBottom: theme.spacing(8),
    }
  },
  label: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
  },
  paymentMethod: {
    display: 'flex',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  },
  paymentTex: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
  },
  paymentImg: {
    userSelect: 'none',
    height: '100%',
    marginLeft: theme.spacing(1),
  },
  cardNumber: {
    height: '40px',
    borderRadius: '4px',
    border: '1px solid #dddddd',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (max-width: 600px)': {
      // height: 'auto',
    }
  },
  cardArea: {
    border: '1px solid #dddddd',
    '@media only screen and (max-width: 600px)': {
      height: '40px',
    }
  },
  paypalButtonDisable: {
    pointerEvents: 'none',
  }
}))
