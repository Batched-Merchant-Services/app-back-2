import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '@styles/Colors';
import { useSelector} from 'react-redux';

const SignUpWrapper = ({
  children,
  forceInset,
  keyboardAware = true,
  ...props
}) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const Wrapper = keyboardAware ? KeyboardAwareScrollView : React.Fragment;
  const wrapperProps = keyboardAware
    ? { keyboardOpeningTime: 100, contentContainerStyle: { flex: 1 } }
    : {};

  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[brandTheme?.bgBlue01??Colors.bgBlue01, brandTheme?.bgBlue02??Colors.bgBlue02]}
      {...props}
    >
      <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }} forceInset={forceInset}>
          {children}
        </SafeAreaView>
    </LinearGradient>
  );
};

SignUpWrapper.propTypes = {
  children: PropTypes.any
};

export default SignUpWrapper;
