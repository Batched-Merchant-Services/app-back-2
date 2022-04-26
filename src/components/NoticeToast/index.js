import React from 'react';
import { TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Text from '@components/Text';
import View from '@components/View';
import ImageComponent from '@components/ImageComponent';
import Colors from '@styles/Colors';
import { useSelector} from 'react-redux';
import WarningWhite from '@assets/icons/warning-white.png';
import Close from '@assets/icons/close.png';

const NoticeToast = ({
  color = Colors.red,
  text,
  isOpen = false,
  onClose = () => null
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  color = brandTheme[color] || Colors.red;

  return (
    isOpen && (
      <View
        flex
        row
        centerV
        centerH
        height-45
        style={{
          backgroundColor: color,
          borderRadius   : 5,
          width          : '96%',
          left           : '2%',
          position       : 'absolute',
          zIndex         : 100,
          marginTop      : getStatusBarHeight()
        }}
      >
        <View marginH-15>
          <ImageComponent source={WarningWhite} height={10} width={10} />
        </View>
        <View flex-1 centerH>
          <Text h10 medium center white>
            {text}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <View marginH-15>
            <ImageComponent white source={Close} height={10} width={10} />
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

export default NoticeToast;
