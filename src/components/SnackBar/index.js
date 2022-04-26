import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, DivSpace } from '@components';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '@utils/i18n';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const SnackBar = ({
  message,
  isVisible,
  onClose,
  animationAction,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  if (isVisible) {
    setTimeout(function(){ onClose(); }, 3000);
  }

  if (isVisible ) {
    return (
      <View centerH>
        <Animatable.View
          animation={'slideInUp'}
          style={styles.offlineContainer}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[brandTheme.orange??Colors.orange,brandTheme.bgOrange02??Colors.bgOrange02]}
            style={styles.offlineContainer}
          >
            <View row>
              <View flex-1 paddingL-15 centerV>
                <Text h12>
                  {message}
                </Text>
              </View>
              <DivSpace width-20 />
              <View
                style={{ flex: 0.5, alignItems: 'flex-end' }}
                centerV
                paddingR-15
              >
                <TouchableOpacity onPress={onClose}>
                  <Text h12 bold>
                    {i18n.t('signUp.component.Notificatios.labelNotification')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>
      </View>
    );
  } else if (animationAction) {
    return (
      <View centerH>
        <Animatable.View
          animation={'fadeOutDown'}
          style={styles.offlineContainer}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[brandTheme.orange??Colors.orange,brandTheme.bgOrange02??Colors.bgOrange02]}
            style={styles.offlineContainer}
          >
            <View row>
              <View flex-1 paddingL-15 centerV>
                <Text h12>
                  {message}
                </Text>
              </View>
              <DivSpace width-20 />
              <View
                style={{ flex: 0.5, alignItems: 'flex-end' }}
                centerV
                paddingR-15
              >
                <TouchableOpacity onPress={onClose}>
                  <Text h12 bold>
                    {i18n.t('signUp.component.Notificatios.labelNotification')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>
      </View>
    );
  } else {
    return null;
  }
};

export default SnackBar;
