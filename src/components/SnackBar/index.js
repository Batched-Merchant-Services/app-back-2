import React,{useState,useEffect} from 'react';
import { TouchableOpacity,Animated } from 'react-native';
import { Text, View, DivSpace } from '@components';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '@utils/i18n';
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbarClose } from '@store/actions/appGraph.actions';
import Colors from '@styles/Colors';

const SnackBar = ({
  message,
  isVisible,
  onClose,
  animationAction,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const appData = redux.user;
  const appGraph = redux.appGraph;
  const brandTheme = appData?.Theme?.colors;
  const SHOW = useSelector(state => state?.appGraph?.toggleSnackbar);
  const MESSAGE = useSelector((state) => state?.appGraph?.snackbarMessage);
  const TYPE = useSelector((state) => state?.appGraph?.typeSnack);
  const [animated, setAnimated] = useState(new Animated.Value(0))
  const duration = 2000;

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      handleClose()
    }, 800);
  };


  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      fadeOut();
    }, 3000);
  }, [SHOW]);


  function handleClose() {
    dispatch(toggleSnackbarClose());
  }


  const errorColor = brandTheme?.error ?? Colors.error;

  const warningColor = brandTheme?.warning ?? Colors.warning;

  const successColor = brandTheme?.success ?? Colors.success;


  let backgroundSnack;
  switch (TYPE) {
    case 'error':
      backgroundSnack = errorColor;
      break;
    case 'warning':
      backgroundSnack = warningColor;
      break;
    case 'success':
      backgroundSnack = successColor;
      break;
    default:
      backgroundSnack = errorColor;
  }


  if (isVisible) {
    setTimeout(function(){ onClose(); }, 3000);
  }

  if (isVisible || SHOW) {
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
                  {message ? message?.toString() : MESSAGE?.toString()}
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
                  {message ? message?.toString() : MESSAGE?.toString()}
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
