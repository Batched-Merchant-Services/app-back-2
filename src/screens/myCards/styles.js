import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    width : scale(275),
    height: scale(180)
  },
  containerImageSlide: {
    width : '100%',
    height: '100%'
  },
  cardBatched: {
    width:scale(290),
    height:verticalScale(200) 
  },
  imageBottom: {
    position: 'absolute', 
    bottom  : verticalScale(-40),
    left    : 0, 
    right   : 0,
    zIndex  : 0
  },
  containerView: {
    borderRadius   : 10
  },
  containerCompleteP: {
    borderBottomRightRadius: verticalScale(10),
    borderBottomLeftRadius : verticalScale(10) 
  },
  containerSwitch: {
    width   : '100%',
    position: 'absolute',
    right   : 0,
    left    : scale(97),
  },

  modalCards: {
    borderRadius   : 10
  },
  confirmationCard: {
    borderRadius   : 10
  },
  containerModal: {
    width          : scale(325), 
    height         : verticalScale(540), 
    borderRadius   : 8 
  },
  touchableButton: {
    width         : '100%',
    height        : '100%', 
    alignItems    : 'center', 
    justifyContent: 'center'
  },

  containerLevel: {
    width         : verticalScale(54), 
    height        : verticalScale(24), 
    borderRadius  : verticalScale(30),
    alignContent  : 'center',
    justifyContent: 'center'
  },

  buttonClose: {
    borderRadius   : verticalScale(30),
    width          : scale(30),
    height         : verticalScale(30),
    alignItems     : 'center',
    justifyContent : 'center'
  }, 
  containerClose: {
    alignItems: 'flex-end', 
    right     : 10, 
    top       : 10
  },
  animation: {
    borderRadius   : 10, 
    width          : '90%'
  },
  containerButton: {
    flex          : 1, 
    alignItems    : 'center', 
    justifyContent: 'center'
  }, 
  closed: {
    borderRadius   : verticalScale(8),
    height         : verticalScale(45)
  },
  viewBtnFloating: { width: '100%', position: 'absolute', bottom: 30 },
  scroll: {
    width            : '100%',
    height           : '100%',
    paddingHorizontal: scale(13)
  },
  containerEmpty: {
    flex         : 1,
  },
  imageEmpty: {
    flex      : 1,
    resizeMode: 'cover',
  },
  textWhite: {
    color: 'white'
  },
  imageContainer: {
    flex      : 1,
    width     : null,
    height    : null,
    resizeMode: 'cover'
  }

});