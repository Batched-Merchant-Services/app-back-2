import { verticalScale, scale } from 'react-native-size-matters';
import { Dimensions, StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
export default StyleSheet.create({
  badge: {
    borderWidth: 2,
    position   : 'absolute',
    zIndex     : 20,
    right      : 0,
    top        : 0
  },
  categoryBadge: {
    borderWidth: 2,
    position   : 'absolute',
    zIndex     : 20,
    right      : 10,
    top        : 0
  },
  container: {
    flex           : 1,
  },
  imageCreditDirec: {
    width : '100%',
    height: verticalScale(130)
  },
  creditImage: {
    borderRadius   : 5
  },
  containerWhite: {
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10
  },
  comboDiscount: {
    borderBottomRightRadius: 10,
    borderTopRightRadius   : 10
  },
  linearDiscount: {
    borderBottomRightRadius: 10,
    borderTopRightRadius   : 10,
    height                 : 18,
    alignItems             : 'center',
    justifyContent         : 'center'
  },
  linearCredit: {
    borderBottomRightRadius: 10,
    borderTopRightRadius   : 10,
    height                 : 18,
    alignItems             : 'center',
    justifyContent         : 'center'
  },
  linearOfert: {
    borderRadius  : 30,
    height        : 20,
    alignItems    : 'center',
    justifyContent: 'center'
  },
  buttonLztn: {
    top            : 12,
    width          : scale(35),
    height         : scale(35),
    borderRadius   : scale(35),
    justifyContent : 'center',
    alignItems     : 'center'
  },
  viewBtnFloating: { width: '100%', position: 'absolute', bottom: 30 },
  locationButton : {
    width          : verticalScale(34),
    height         : verticalScale(34),
    borderRadius   : 100,
  },
  locationWrapper: {
    zIndex      : 2,
    marginBottom: verticalScale(20)
  },
  navigationInfo: {
    zIndex         : 2,
    borderRadius   : 10,
    width          : '100%'
  },
  navigationFooter: {
    width   : Dimensions.get('window').width - scale(20),
    bottom  : verticalScale(16),
    left    : scale(10),
    position: 'absolute'
  },
  centerQR: {
    backgroundColor: '#EDEFF2',
    width          : Dimensions.get('window').width - scale(40),
    borderRadius   : 10
  },
  bordersBottom: {
    height                 : verticalScale(70),
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10
  },
  containerQR: {
    borderColor: 'red',
    borderWidth: 1
  },
  wrapper: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  imageSlideOferts: {
    width : '100%',
    height: verticalScale(250)
  },
  styleMap: {
    width       : '100%',
    height      : verticalScale(156),
    borderRadius: 5,
    borderColor : Colors.textGray,
    borderWidth : 1
  },
  controlSlide: {
    width          : verticalScale(30),
    height         : verticalScale(30),
    borderRadius   : verticalScale(30),
    alignItems     : 'center',
    justifyContent : 'center',
    opacity        : 0.7
  },
  positionButtons: {
    position: 'absolute',
    top     : verticalScale(135),
    left    : 0
  },
  navigator: {
    flex    : 1,
    position: 'absolute',
    width   : '100%',
    top     : 30,
    left    : 0,
    zIndex  : 0
  },
  percentDiscount: {
    borderWidth            : 1,
    borderTopRightRadius   : 30,
    borderBottomRightRadius: 30
  },
  containerDiscount: {
  },
  containerIscredit: {
  },
  providersScrollView: {  flex: 1 },
  providersContainer : { paddingHorizontal: scale(25),justifyContent: 'center', flexWrap: 'wrap' },
  providerContainer  : {
    borderRadius   : 10
  },
  saveButton: {
    top           : 5,
    justifyContent: 'center',
    alignItems    : 'center',
    zIndex        : 1e3
  },
  providersViewBtnFloating: {
    width   : '100%',
    position: 'absolute',
    bottom  : verticalScale(5)
  },
  providerPaymentContainer : { 
    borderRadius: 10,
  },
  providerPaymentContainer2: { 
    borderRadius: 10, 
  },
  providerHeader           : {
    backgroundColor     : 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius : 10
  },
  providerRecordContainer: {
    borderRadius: 10,
  },
  providerRecordLogo: {
    borderRadius: 8,
    height      : scale(52)
  },
  datumContainer: {
    borderRadius   : 8,
  },
  containerSearch: {
    flexDirection : 'row',
    height        : 39,
    justifyContent: 'center',
    borderWidth   : 1,
    borderRadius  : 5,

  },
});
