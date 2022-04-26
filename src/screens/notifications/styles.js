import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  leftAction: {
    flex           : 1,
    backgroundColor: 'transparent',
    justifyContent : 'center',
  },
  actionText: {
    color          : 'white',
    fontSize       : 16,
    backgroundColor: 'transparent',
    padding        : 10,
  },
  rightAction: {
    alignItems    : 'center',
    flex          : 1,
    justifyContent: 'center',
  },
  rectButton: {
    flex             : 1,
    height           : verticalScale(160),
    paddingVertical  : verticalScale(10),
    paddingHorizontal: scale(20),
    justifyContent   : 'space-between',
    flexDirection    : 'column',
  },
  fromText: {
    fontWeight     : 'bold',
    backgroundColor: 'transparent',
  },
  animation: {
    overflow               : 'hidden',
    borderTopRightRadius   : verticalScale(12),
    borderBottomRightRadius: verticalScale(12),
    borderTopLeftRadius    : verticalScale(12),
    borderBottomLeftRadius : verticalScale(12),
  },
  containerFlatList: {
    position      : 'absolute',
    top           : verticalScale(80),
    left          : 0,
    right         : 0,
    bottom        : 0,
    justifyContent: 'center',
    alignItems    : 'center'
  },
  borderReactButton: {
    borderRadius   : 8 
  },
  imageBackground: {
    width : '100%',
    height: verticalScale(188)
  }
});

export default styles;
