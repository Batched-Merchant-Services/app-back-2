import React from 'react';
import PropTypes from 'prop-types';

import {
  Checkbox,
  View,
  Text,
  DivSpace,
  Line,
  Link,
  ButtonRounded
} from '@components';

import { useValidatedInput } from '@hooks/validation-hooks';
import Styles from '@screens/credits/styles';
import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';

const CreditElementDetail = ({
  onAccept,
  amount,
  interest,
  iva,
  total,
  installmentsAmount,
  numberOfPayments,
  paymentsFrequency
}) => {
  const agreeCheck = useValidatedInput('agree', true, {
    changeHandlerName: 'onChange'
  });

  const buttonDisabled = !agreeCheck.value;

  return (
    <View marginH-22 textBlueDark paddingV-23 paddingH-19 style={Styles.creditDetailCard}>
      <View centerH>
        <View width-223>
          <Text center h10>
            {i18n.t('creditDetails.component.description1')}{' '}
            <Text h10 orange medium>
              {i18n.t('creditDetails.component.description2')}
            </Text>{' '}
            {i18n.t('creditDetails.component.description3')}
          </Text>
        </View>
        <DivSpace height-20 />
        <View row centerV>
          <Checkbox {...agreeCheck} checkedValue={true} />
          <DivSpace width-10 />
          <Text white h10 regular>
            {i18n.t('creditDetails.component.agree')}
          </Text>
        </View>
        <DivSpace height-20 />
        <ButtonRounded disabled={buttonDisabled} onPress={onAccept}>
          <Text h12 semibold>
            {i18n.t('creditDetails.component.accept')}
          </Text>
        </ButtonRounded>
        <DivSpace height-28 />
      </View>
      <View>
        <Text h12 medium white>
          {i18n.t('creditDetails.component.details')}
        </Text>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.capital')}
            </Text>
          </View>
          <View right>
            <Text h12 medium white>
              {moneyFormatter(amount)}
            </Text>
          </View>
        </View>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.interest')}
            </Text>
          </View>
          <View right>
            <Text h12 medium white>
              {moneyFormatter(interest)}
            </Text>
          </View>
        </View>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.iva')}
            </Text>
          </View>
          <View right>
            <Text h12 medium>
              {moneyFormatter(iva)}
            </Text>
          </View>
        </View>
        <DivSpace height-6 />
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.total')}
            </Text>
          </View>
          <View right>
            <Text h12 medium white>
              {moneyFormatter(total)}
            </Text>
          </View>
        </View>
        <DivSpace height-14 />
        <Line />
        <DivSpace height-11 />
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.installments')}
            </Text>
          </View>
          <View right>
            <Text h12 medium white>
              {numberOfPayments} {paymentsFrequency}
            </Text>
          </View>
        </View>
        <View row centerV>
          <View flex-1>
            <Text h10 textGray>
              {i18n.t('creditDetails.component.credit.installmentsAmount')}
            </Text>
          </View>
          <View right>
            <Text h12 medium>
              {moneyFormatter(installmentsAmount)}
            </Text>
          </View>
        </View>
        <DivSpace height-26 />
        <Link onPress={() => {}}>
          <Text h10 medium title>
            {i18n.t('creditDetails.component.credit.pdf')}
          </Text>
        </Link>
      </View>
    </View>
  );
};

CreditElementDetail.propTypes = {
  onAccept          : PropTypes.func,
  amount            : PropTypes.number.isRequired,
  interest          : PropTypes.number.isRequired,
  iva               : PropTypes.number.isRequired,
  total             : PropTypes.number.isRequired,
  installmentsAmount: PropTypes.number.isRequired,
  numberOfPayments  : PropTypes.number.isRequired,
  paymentsFrequency : PropTypes.string.isRequired
};

export default CreditElementDetail;
