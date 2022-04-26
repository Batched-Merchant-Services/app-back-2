import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
  wrapper: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  creditInfoCard: {
    backgroundColor: Colors.textBlueDark
  },
  creditInfoCardFooter: {
    justifyContent: 'space-between'
  },
  giftElement: {
    backgroundColor: Colors.white,
    borderRadius   : 8
  },
  creditElementCardImages: { justifyContent: 'space-between' },
  creditLogo             : {
    backgroundColor: 'white',
    borderRadius   : 6,
    shadowColor    : '#000',
    shadowOffset   : {
      width : 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius : 4,
    elevation    : 2
  },
  creditDetailCard: {
    backgroundColor        : Colors.textBlueDark,
    borderBottomLeftRadius : 8,
    borderBottomRightRadius: 8
  },
  containerImage: {
    width         : verticalScale(100),
    height        : verticalScale(100),
    alignItems    : 'center',
    justifyContent: 'center'
  },
  containerNotific: {
    flex           : 1,
    height         : verticalScale(90),
    backgroundColor: Colors.bgBlue07,
    borderRadius   : verticalScale(10)
  },
  buttonSeeCredit: {
    width          : scale(160),
    height         : verticalScale(45),
    backgroundColor: '#37458B',
    borderRadius   : verticalScale(40),
    marginTop      : -40,
  },
  viewButton:{
    backgroundColor:'#37458B',
    height: verticalScale(33), 
    position:'absolute', 
    bottom: 0, 
    right:0, 
    left:0 
  },
  manualCreditWrapper: {
    backgroundColor: Colors.textBlueDark,
    borderRadius   : 10
  },
  manualCreditImageWrapper: {
    backgroundColor: 'white',
    borderRadius   : 10
  },
  manualCreditButton: { 
    width: scale(144) 
  },
  linearOfert: {
    borderRadius  : 30,
    height        : 20,
    alignItems    : 'center',
    justifyContent: 'center'
  },
  linearOfertList: {
    height        : 20,
    alignItems    : 'center',
    justifyContent: 'center'
  },
  benefits: {
    borderColor            : 'red',
    borderWidth            : 1,
    borderTopRightRadius   : 30, 
    borderBottomRightRadius: 30,
  },
  containerImageProv: {
    backgroundColor: 'white',
    borderRadius   : 5,
    borderColor    : '#CFD7E2',
    borderWidth    : 1 ,
    shadowOpacity  : 0.2,
    shadowRadius   : 3,
    shadowOffset   : {
      height: 5,
      width : 0
    },
    //android
    elevation: 1
  },
  containerIscredit: {
    backgroundColor: Colors.textBlueDark
  },
  viewBtnFloating: {
    backgroundColor: 'transparent'
  },
});
