import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Animated } from 'react-native';
import { View, Text, DivSpace, ImageComponent, BoxLevelBadge } from '@components';
import Styles from '@screens/credits/styles';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';

import CreditImage from '@assets/credits/credit-image.png';
 
const CreditElement = ({
  amount,
  interestPercentage,
  level,
  numberOfPayments,
  onPress,
  paymentsFrequency,
  provider,
  providerDetail,
  index
}) => {
  const [scaleValue]=useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue : 1,
      duration: 1000,
      delay   : index * 120
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: scaleValue }}>
      <TouchableOpacity onPress={onPress}>
        <View
          white
          marginH-18
          style={[Styles.roundCornersCard, Styles.creditElementCard]}
        >
          <View paddingH-14 paddingV-14 flex-1 row>
            <View flex-1>
              <Text h10 textGray>
                {i18n.t('myCreditOptions.component.credit.creditAmount')}
              </Text>
              <Text h24 medium textBlue01>
                {moneyFormatter(amount)}
              </Text>
              <DivSpace height-14 />
              <View row>
                <View>
                  <Text h10 textGray>
                    {i18n.t('myCreditOptions.component.credit.interest')}
                  </Text>
                  <Text h14 medium textBlue01>
                    {interestPercentage}%
                  </Text>
                </View>
                <DivSpace width-15 />
                <View>
                  <Text h10 textGray>
                    {i18n.t('myCreditOptions.component.credit.installments')}
                  </Text>
                  <Text h14 medium textBlue01>
                    {numberOfPayments} {paymentsFrequency}
                  </Text>
                </View>
              </View>
              <DivSpace height-10 />
              <View flex-1 centerV>
                <Text h10 textGray>
                  {i18n.t('myCreditOptions.component.credit.provider')}
                </Text>
                <Text h12 medium textBlue01 numberOfLines={1}>
                  {provider} {providerDetail}
                </Text>
              </View>
            </View>
            <DivSpace width-10 />
            <View right style={Styles.creditElementCardImages}>
              <BoxLevelBadge level={level} sm/>
              <View paddingV-6 paddingH-6 white style={Styles.creditLogo}>
                <ImageComponent source={CreditImage} height={26} width={89} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

CreditElement.propTypes = {
  amount            : PropTypes.number.isRequired,
  interestPercentage: PropTypes.number.isRequired,
  level             : PropTypes.number.isRequired,
  numberOfPayments  : PropTypes.number.isRequired,
  onPress           : PropTypes.func,
  paymentsFrequency : PropTypes.string.isRequired,
  provider          : PropTypes.string.isRequired,
  providerDetail    : PropTypes.string.isRequired
};

export default CreditElement;
