import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { BoxGradient,ButtonSquareGradient, DivSpace, Text, View, ImageComponent } from '@components';
import Styles from '@screens/nationalPayments/styles';
import rowRight from '@assets/icons/rowRight.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const PaymentsInternationalButton = ({ badge, label, image, onPress }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <TouchableOpacity onPress={onPress}>
      <View  width-91>
        <ButtonSquareGradient orange style={Styles.heightLinear}>
          <DivSpace height-14/>
          <View flex-1 marginL-23 style={{ width:'100%' }}>
            <Text h12>
              {label}
            </Text>
            <DivSpace height-5 />
            <View width-20 height-1 style={{borderColor: brandTheme?.bgGray??Colors.bgGray,borderWidth:1}}/>
            <DivSpace height-10 />
            <View row >
              <View flex-1>
                <ImageComponent source={image} width={35} height={35} />
              </View>
              <View flex-1 bottom style={{flex: 0.4}}>
                <ImageComponent  source={rowRight} width={12} height={12} />
              </View>
            </View>
          </View>
        </ButtonSquareGradient>
        
      </View>
      {badge && (
        <BoxGradient size={24} orange style={[Styles.badge,{ borderColor: brandTheme?.white??Colors.white,}]}>
          <Text h14 semibold white>
            {badge}
          </Text>
        </BoxGradient>
      )}
    </TouchableOpacity>
  );
};

PaymentsInternationalButton.propTypes = {
  label  : PropTypes.string,
  image  : PropTypes.any,
  onPress: PropTypes.func
};

export default PaymentsInternationalButton;
