import { Dimensions, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
const { width } = Dimensions.get('window');

const modalWidth = width - 40;

export default StyleSheet.create({
  containerModal: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: 'rgba(12, 23, 41, .54)'
  },
  heightContainer: {
    height: verticalScale(60),
  },
  modal: {
    backgroundColor: 'white',
    width          : scale(modalWidth),
    borderRadius   : verticalScale(8),
    alignItems     : 'center'
  },
  buttonList: {
    width         : '100%',
    height        : verticalScale(45),
    borderWidth   : scale(1),
    borderRadius  : verticalScale(5),
    justifyContent: 'center'
  },
  textPicker: {
    left      : scale(10),
    fontWeight: '600'
  },
  calendarIcon: {
    flex      : 1,
    width     : scale(23),
    height    : verticalScale(23),
    resizeMode: 'contain'
  },
  labelDate: {
    flex      : 2, 
    alignItems: 'flex-start'
  },
  placeholderDate: {
    flex      : 2, 
    alignItems: 'flex-start'
  },
  iconCalendar: {
    flex      : 1, 
    alignItems: 'flex-end', 
    right     : '20%'
  }

});
