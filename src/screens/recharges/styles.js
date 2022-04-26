import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { verticalScale, scale } from 'react-native-size-matters';
const Styles = StyleSheet.create({
  header: {
    flexDirection : 'row',
    alignItems    : 'center',
    height        : verticalScale(80) + getStatusBarHeight(),
    position      : 'absolute',
    width         : '100%',
    top           : 0,
    justifyContent: 'space-between',
    zIndex        : 1
  },
  button: {
    height    : verticalScale(45),
    width     : verticalScale(50),
    alignItems: 'center'
  },
  badge: {
    position: 'absolute',
    top     : verticalScale(3),
    left    : verticalScale(2)
  },
  carousel: {
    position: 'absolute',
    bottom  : 0,
    width   : '100%',
  },
  itemWrapper: {
    height: verticalScale(235)
  },
  item: {
    height         : verticalScale(190),
    borderRadius   : verticalScale(10),
    shadowColor    : '#1D254A',
    shadowOffset   : {
      width : scale(2),
      height: verticalScale(2)
    },
    shadowOpacity: 0.4,
    shadowRadius : verticalScale(4),
    elevation    : 4
  },
  itemIconWrapper: { top: -20, zIndex: 20 },
  itemIcon       : {
    width          : verticalScale(50),
    height         : verticalScale(50),
    borderRadius   : verticalScale(50)
  },
  locationWrapper: {
    zIndex  : 2,
    position: 'absolute',
    bottom  : verticalScale(208),
    right   : scale(35)
  },
  locationWrapperRecharging: {
    bottom  : verticalScale(160),
    zIndex  : 2,
    position: 'absolute',
    right   : scale(35)
  },
  locationButton: {
    width          : verticalScale(34),
    height         : verticalScale(34),
    borderRadius   : 100
  },
  locationShowBox: {
    bottom  : verticalScale(140),
    zIndex  : 2,
    position: 'absolute',
    right   : scale(35),

  },
  containerQR: {
    width               : scale(314),
    height              : verticalScale(390),
    borderTopRightRadius: verticalScale(10),
    borderTopLeftRadius : verticalScale(10)
  },
  containerRechargeQR: {
    width               : scale(314),
    borderTopRightRadius: verticalScale(10),
    borderTopLeftRadius : verticalScale(10)
  },
  containerRechargeUser: {
    width          : scale(314),
    borderRadius   : verticalScale(10)
  },
  containerRechargeFooter: {
    width                  : scale(314),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius : 10
  },
  containerFooter: {
    width                  : scale(314),
    height                 : verticalScale(110),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius : 10
  },
  closeButton: {
    position       : 'absolute',
    top            : verticalScale(-20),
    left           : scale(135),
    right          : 0,
    bottom         : 0,
    width          : verticalScale(35),
    height         : verticalScale(35),
    borderRadius   : verticalScale(35),
    alignItems     : 'center',
    justifyContent : 'center'
  },
  closeButtonUser: {
    position       : 'absolute',
    top            : verticalScale(-20),
    right          : scale(10),
    bottom         : 0,
    width          : verticalScale(35),
    height         : verticalScale(35),
    borderRadius   : verticalScale(35),
    alignItems     : 'center',
    justifyContent : 'center'
  },
  containerTrans: {
    flex           : 1,
  },
  carouselItem: {
    width          : '85%',
    height         : '85%',
    borderRadius   : 10
  },
  userImage: {
    width          : verticalScale(72),
    height         : verticalScale(72),
    borderRadius   : 100,
  },
  viewInfoCntc: {
    alignItems    : 'center',
    justifyContent: 'center'
  },
  rechargingWrapper: {
    width         : '100%',
    position      : 'absolute',
    bottom        : 0,
    justifyContent: 'center'
  },
  rechargingContainer: {
    width          : '90%',
    borderRadius   : 10
  },
  rechargingAvatar: {
    width          : 36,
    height         : 36,
    borderRadius   : 100
  },
  rechargingBoxInfo: {
    position      : 'absolute',
    bottom        : 15,
    left          : 0,
    right         : 0,
    justifyContent: 'center'
  },
});

export default Styles;
