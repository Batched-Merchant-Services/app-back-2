/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Animated } from 'react-native';
import { View, Text, DivSpace, ImageComponent, BoxLevelBadge } from '@components';
import Styles from '@screens/credits/styles';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import CreditImage from '@assets/credits/credit-image.png';

const CreditHiredElement = ({
  amount,
  detline,
  detail,
  level,
  numberOfPayments,
  onPress,
  provider,
  status,
  index
}) => {
  const [scaleValue]=useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue : 1,
      duration: 1000,
      delay   : index * 120
    }).start();
  }, [Animated]);
  
  return (
    <Animated.View style={{ opacity: scaleValue }}>
      <TouchableOpacity onPress={onPress}>
        <View
          white
          marginH-18
          style={[Styles.roundCornersCard, Styles.creditElementCard,{borderBottomColor: status==='pay'? '#00B9D9':status==='pending'?Colors?.orange:Colors?.red,borderBottomWidth: 5}]}
        >
          <View paddingH-14 paddingV-14 flex-1 row>
            <View flex-1>
              <Text h11 bgBlue02>
                {detail}
              </Text>
              <DivSpace height-14 />
              <View row>
                <View>
                  <Text h10 textGray>
                    {i18n.t('contractedCredits.component.textDeadline')}
                  </Text>
                  <Text h14 medium textBlue01>
                    {detline}
                  </Text>
                </View>
                <DivSpace width-20 />
                <View>
                  <Text h10 textGray>
                    {i18n.t('contractedCredits.component.textPay')}
                  </Text>
                  <Text h14 medium textBlue01>
                    {numberOfPayments}
                  </Text>
                </View>
                <DivSpace width-20 />
                <View>
                  <Text h10 right textGray>
                    {i18n.t('contractedCredits.component.textBiweeklyPayment')}
                  </Text>
                  <Text h14 medium textBlue01>
                    {moneyFormatter(amount)}
                  </Text>
                </View>
              </View>
              <DivSpace height-10 />
              <View flex-1 centerV>
                <Text h10 textGray>
                  {i18n.t('contractedCredits.component.textProvider')}
                </Text>
                <Text h12 medium textBlue01 numberOfLines={1}>
                  {provider}
                </Text>
              </View>
            </View>
            <DivSpace width-10 />
            <View right style={Styles.creditElementCardImages}>
              <BoxLevelBadge level={level} sm/>
              <View paddingV-6 paddingH-6 bgBlue07 style={Styles.creditLogo}>
                <ImageComponent source={CreditImage} height={26} width={89} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
    
  );
};

CreditHiredElement.propTypes = {
  amount            : PropTypes.number.isRequired,
  interestPercentage: PropTypes.number.isRequired,
  level             : PropTypes.number.isRequired,
  numberOfPayments  : PropTypes.string.isRequired,
  onPress           : PropTypes.func,
  paymentsFrequency : PropTypes.string.isRequired,
  provider          : PropTypes.string.isRequired,
  index             : PropTypes.number.isRequired,
};

export default CreditHiredElement;
