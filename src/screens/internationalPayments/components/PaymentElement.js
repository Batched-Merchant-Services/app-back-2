import React from 'react';

import { moneyFormatter } from '@utils/formatters';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace } from '@components';
import PlaceHolder from '@assets/internationalPayments/placeholder.png';

import Styles from '@screens/internationalPayments/styles';

const ReceivedPaymentElement = ({ payment, children, white = false , page , onPress}) => {

  return (
    <View height-240 marginB-15 style={Styles.element}>
      <View margin-15 height-60 >
        <View row marginT-10>
          <View flex-1>
            <Text h15 white>{i18n.t('receivedInternationalPayments.component.amount')} <Text bold white> {page ==='sent'? i18n.t('receivedInternationalPayments.component.sent') : i18n.t('receivedInternationalPayments.component.received')}</Text></Text>
            <Text h10 textGray>08/15/2019, Mexico</Text>
          </View>
          <View centerV style={Styles.containerAmount}>
            <Text h10 textGray center>{page ==='sent'? i18n.t('receivedInternationalPayments.component.amountRequestSent'):i18n.t('receivedInternationalPayments.component.amountRequest')}{' '}(MXN)</Text>
            <Text h20 semibold white>{moneyFormatter(payment.amount)}</Text>
          </View>
        </View>
        <View height-59 centerV row style={Styles.header}>
          <View  style={{ flex: 0.2 }}>
            <View style={Styles.avatar}>
              <ImageComponent source={PlaceHolder} height={40} width={40} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text column h12 semibold white numberOfLines={1}>
              {payment.contactName}
            </Text>
            <Text column h12  white numberOfLines={1}>
              {payment.contactLastName}
            </Text>
          </View>
        </View>
        <Text h10 {...{ [white ? 'white' : 'white']: true }}>
          {payment.description}
        </Text>
        <DivSpace height-20 />
        {children}
      </View>
    </View>
  );
};

export default ReceivedPaymentElement;
