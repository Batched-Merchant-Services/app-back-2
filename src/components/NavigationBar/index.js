import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, ImageComponent, View, DivSpace } from '@components';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';

const Back = require('@assets/icons/backBlue.png');
const BackWhite = require('@assets/icons/back-white.png');


const RegularContainer = ({ children }) => {
 
  return (
    <View row bottom height-40 style={{marginTop: (Platform.OS === 'ios') ? 0 : verticalScale(30)}}>
      {children}
      <DivSpace height-15 />
    </View>
  );
};

const renderIcon = (action, white,Style,brandTheme) => {
  return (
    action 
    && <TouchableOpacity
      style={[{
        left           : scale(23),
        width          : scale(35),
        height         : scale(35),
        borderRadius   : scale(35),
        justifyContent : 'center',
        alignItems     : 'center',
        zIndex         : 1e3,
        backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark
      },Style]}
      onPress={action}
    >
      <ImageComponent 
        white
        source={ Back } height={scale(20)} width={scale(20)} />
    </TouchableOpacity>
  );
};

const renderBody = (body,textStyle) => {
  if (typeof body === 'string') {
    return (
      <View centerH>
        <Text h12 medium title center style={[textStyle]}>
          {body}
        </Text>
      </View>
    );
  }
  return body;
};

const renderSubtitle = title => {
  if (typeof title === 'string') {
    return (
      <>
        <DivSpace height-10 />
        <Text h12 medium title center white>
          {title}
        </Text>
      </>
    );
  }
  return title;
};

const NavigationBar = ({ onBack, body, subtitle, onClose, white, Style={},textStyle={} }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const Container = RegularContainer;
  return (
    <Container>
      <View bottom width-60>
        {renderIcon(onBack, white,Style,brandTheme)}
      </View>
      <View flex-1 centerH centerV style={{ minHeight: scale(35) }}>
        {renderBody(body,textStyle)}
        {renderSubtitle(subtitle)}
      </View>
      <View width-60 right paddingR-20>
        {onClose}
      </View>
    </Container>
  );
};

NavigationBar.propTypes = {
  onBack          : PropTypes.func,
  body            : PropTypes.any,
  withTransparency: PropTypes.bool
};

export default NavigationBar;
