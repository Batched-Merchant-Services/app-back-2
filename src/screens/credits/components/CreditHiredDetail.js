import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import {
  View,
  Text,
  DivSpace,
  Line,
  ButtonRounded,
  MenuContainer,
  ButtonWallet
} from '@components';
import { useValidatedInput } from '@hooks/validation-hooks';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import IconHistory from '@utils/iconSVG/IconHistory';
import IconRequestCash from '@utils/iconSVG/IconRequestCash';
import IconCancelCard from '@utils/iconSVG/IconCancelCard';
import { scale,verticalScale } from 'react-native-size-matters';
import Styles from '@screens/credits/styles';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';

const circularShadow = require( '@assets/levels/circularShadow.png');

const CreditHiredDetail = ({
  onAccept
}) => {
  const agreeCheck = useValidatedInput('agree', true, {
    changeHandlerName: 'onChange'
  });

  const buttonDisabled = !agreeCheck.value;

  return (
    <View>
      <View marginH-22 textBlueDark paddingV-23 paddingH-19 style={Styles.creditDetailCard}>
        <View centerH>
          <ButtonRounded disabled={buttonDisabled} onPress={onAccept}>
            <Text h12 semibold>
              {i18n.t('contractedCredits.component.buttonPay')}
            </Text>
          </ButtonRounded>
          <DivSpace height-20 />
          <Text h10 white center>
            {i18n.t('contractedCredits.component.textTheFundsWillBe')}
          </Text>
        </View>
        <DivSpace height-20 />
        <Line />
        <DivSpace height-20 />
        <View row>
          <View centerH width-135 textBlue01  height-170>
            <DivSpace height-10/>
            <Text h10 textGray center>{i18n.t('contractedCredits.component.textPaymentTerm')}</Text>
            <DivSpace height-5/>
            <Text h10 textGray bold center>{i18n.t('contractedCredits.component.textBiweekly')}</Text>
            <DivSpace height-10/>
            <ImageBackground source={circularShadow} style={Styles.containerImage}>
              <AnimatedCircularProgress
                size={verticalScale(69)}
                width={verticalScale(9)}
                fill={80}
                rotation={0}
                tintColor="#E9A04A"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#7175FE">
                {
                  (fill) => (
                    <View centerH>
                      <Text white h11 bgOrange02>
                        {i18n.t('contractedCredits.component.buttonPay')}
                      </Text>
                      <Text white style={Styles.showNumberLevel}>
                        09/12
                      </Text>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            </ImageBackground>
          </View>
          <DivSpace width-10 />
          <View column>
            <Text h10 textGray>{i18n.t('contractedCredits.component.textCreditDetail')}</Text>
            <DivSpace height-10/>
            <Text h10 textGray>{i18n.t('contractedCredits.component.textCapital')}</Text>
            <Text h12 textGray bold>{moneyFormatter(3500)}</Text>
            <DivSpace height-5/>
            <Text h10 textGray>{i18n.t('contractedCredits.component.textInterestAmount')}</Text>
            <Text h12 textGray bold>{moneyFormatter(3500)}</Text>
            <DivSpace height-5/>
            <Text h10 textGray>{i18n.t('contractedCredits.component.textIva')}</Text>
            <Text h12 textGray bold>{moneyFormatter(26.25)}</Text>
            <DivSpace height-5/>
            <Text h10 textGray>{i18n.t('contractedCredits.component.textTotalToPay')}</Text>
            <Text h12 textGray bold>{moneyFormatter(3701)}</Text>
          </View>
        </View>
      </View>
      <DivSpace height-8 />
      <View centerH >
        <MenuContainer boxStyles={{ width: scale(310) }}>
          <View flex-1 row marginV-15 centerH centerV >
            <ButtonWallet IconButton={IconRequestCash} titleText={i18n.t('contractedCredits.component.textContract')}/>
            <ButtonWallet IconButton={IconHistory} titleText={i18n.t('contractedCredits.component.textAmortizationTable')}/>
            <ButtonWallet IconButton={IconCancelCard}  titleText={i18n.t('contractedCredits.component.textCapitalPayment')}/>
          </View>
        </MenuContainer>
      </View>
      <DivSpace height-20 />
    </View>
  );
};

CreditHiredDetail.propTypes = {
  onAccept          : PropTypes.func,
  amount            : PropTypes.number.isRequired,
  interest          : PropTypes.number.isRequired,
  iva               : PropTypes.number.isRequired,
  total             : PropTypes.number.isRequired,
  installmentsAmount: PropTypes.number.isRequired,
  numberOfPayments  : PropTypes.number.isRequired,
  paymentsFrequency : PropTypes.string.isRequired
};

export default CreditHiredDetail;
