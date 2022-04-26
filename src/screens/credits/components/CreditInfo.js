import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import {
  View,
  Text,
  Line,
  DivSpace,
  ImageComponent,
  BoxLevelBadge
} from '@components';
import i18n from '@utils/i18n';
import { moneyFormatter } from '@utils/formatters';

import Styles from '@screens/credits/styles';
import AngleRightOrange from '@assets/icons/angle-right-orange.png';

const CreditInfo = ({
  available,
  level,
  maxAmount,
  contractedAmount,
  contracted
}) => {
  return (
    <View marginH-18 textBlueDark style={[Styles.roundCornersCard, Styles.creditInfoCard]}>
      <View paddingH-18 paddingV-11>
        <View row centerV>
          <View flex-1>
            <Text h10 medium white>
              {i18n.t('myCreditOptions.component.info.available')}
            </Text>
          </View>
          <View right>
            <BoxLevelBadge level={level} sm />
          </View>
        </View>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 regular textGray>
              {i18n.t('myCreditOptions.component.info.maxAmount')}
            </Text>
          </View>
          <View right>
            <Text h12 semibold white>
              {moneyFormatter(maxAmount)}
            </Text>
          </View>
        </View>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 regular textGray>
              {i18n.t('myCreditOptions.component.info.contractedAmount')}
            </Text>
          </View>
          <View right>
            <Text h12 semibold white>
              {moneyFormatter(contractedAmount)}
            </Text>
          </View>
        </View>
        <DivSpace height-7 />
        <Line />
        <DivSpace height-7 />
        <View row centerV>
          <View flex-1>
            <Text h10 regular textGray>
              {i18n.t('myCreditOptions.component.info.availableYourLevel')}
            </Text>
          </View>
          <View right>
            <Text h12 semibold white>
              {String(available).padStart(2, '0')}
            </Text>
          </View>
        </View>
        <DivSpace height-4 />
        <View row centerV>
          <View flex-1>
            <Text h10 regular textGray>
              {i18n.t('myCreditOptions.component.info.contracted')}
            </Text>
          </View>
          <View right>
            <Text h12 semibold white>
              {String(contracted).padStart(2, '0')}
            </Text>
          </View>
        </View>
        <DivSpace height-7 />
        <Line />
        <DivSpace height-7 />
        <View row centerV>
          <View flex-1>
            <Text h9 regular title>
              {i18n.t('myCreditOptions.component.info.description')}
            </Text>
          </View>
          <TouchableOpacity>
            <View width-65 row centerV style={Styles.creditInfoCardFooter}>
              <Text h11 semibold orange>
                {i18n.t('myCreditOptions.component.info.details')}
              </Text>
              <ImageComponent bgOrange02 source={AngleRightOrange} width={6} height={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

CreditInfo.propTypes = {
  available       : PropTypes.number.isRequired,
  level           : PropTypes.number.isRequired,
  maxAmount       : PropTypes.number.isRequired,
  contractedAmount: PropTypes.number.isRequired,
  contracted      : PropTypes.number.isRequired
};

export default CreditInfo;
