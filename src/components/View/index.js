import React from 'react';
import { View as RNView, SafeAreaView, StatusBar, Platform, Animated } from 'react-native';
import { useSelector} from 'react-redux';
import StyleHelper from '@utils/styleHelper';

const View = ({onLayout, animated,...props}) => {
  const { useSafeArea = false } = props;
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const EView = useSafeArea ? SafeAreaView : animated? Animated.View : RNView;
  const androidPadding = useSafeArea && Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const baseStyle = {
    ...StyleHelper.extractFlexValue(props),
    ...StyleHelper.extractFlexDirection(props),
    ...StyleHelper.extractAlignmentsValues(props),
    ...StyleHelper.extractHeight(props),
    ...StyleHelper.extractWidth(props),
    ...StyleHelper.extractPaddingVariation(props),
    ...StyleHelper.extractMarginVariation(props),
    ...StyleHelper.extractBackgroundColorValue(props,brandTheme)
  };

  return (
    <EView onLayout={onLayout} style={[baseStyle, props.style]} >
      {
        Platform.OS === 'android' && useSafeArea
          ? <RNView style={{ height: androidPadding }} />
          : null
      }
      {props.children}
    </EView>
  );
};

export default View;