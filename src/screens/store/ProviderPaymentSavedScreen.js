import React, { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { scale } from 'react-native-size-matters';
import { DivSpace, NavigationBar, Text, View, ImageComponent } from '@components';
import { formatDate } from '@utils/formatters';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import i18n from '@utils/i18n';
import Styles from '@screens/store/styles';
import Close from '@assets/icons/close-blue.png';
import Angle from '@assets/icons/angle-right-orange.png';
import { useSelector,useDispatch } from 'react-redux';
import { deleteItem } from '@store/ducks/user.ducks';
import EmptyState from '@screens/EmptyState';

const ProviderPaymentSavedScreen = ({ navigation }) => {
  const notes = useSelector(state => state);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState([...notes.user.FavPayServices]);
  function handleBackPress() {
    navigation.goBack();
  }

  function handlePaymentPress(payment) {
    return () => navigation.navigate('ProviderPayment', { info: payment });
  }

  function handlePaymentRemovePress(index) {
    return () => {
      saved.splice(index, 1);
      setSaved([...saved]);
      dispatch(deleteItem(index));
    };
  }

  return (
    <SignUpWrapper keyboardAware={false} forceInset={{ bottom: 0 }}>
      <NavigationBar
        disableExtraTop
        onBack={handleBackPress}
        body={i18n.t('storeProviderPayments.component.confirmation')}
      />
      <DivSpace height-20 />
      <ScrollView>
        {saved.length <= 0 &&(
          <EmptyState navigation={navigation}/>
        )}

        {saved.length > 0 &&(
          saved.map((payment, index) => (
            <View
              key={index}
              marginH-20
              marginB-15
              paddingV-13
              paddingH-10
              bgGray
              style={Styles.providerRecordContainer}
            >
              <View row>
                <View paddingT-12>
                  <View
                    width-65
                    white
                    style={Styles.providerRecordLogo}
                    centerV
                    centerH
                  >
                    <ImageComponent
                      source={{ uri: payment.data.data.logo }}
                      width={scale(55)}
                      height={scale(42)}
                    />
                  </View>
                </View>
                <DivSpace width-10 />
                <View flex-1 paddingT-12>
                  <Text h12 bgBlue02>
                    {payment.data.data.biller_name}
                  </Text>
                  <DivSpace height-5 />
                  <Text h10 textGray>
                    {i18n.t('storeProviderPayments.component.serviceType')}
                  </Text>
                  <Text h12 bgBlue02>
                    {payment.data.data.biller_description}
                  </Text>
                </View>
                <View centerH style={{ justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={handlePaymentRemovePress(index)}>
                    <ImageComponent
                      source={Close}
                      width={scale(22)}
                      height={scale(22)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePaymentPress(payment)}>
                    <View paddingH-10 paddingT-10>
                      <ImageComponent
                        bgOrange02
                        source={Angle}
                        width={scale(14)}
                        height={scale(14)}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <DivSpace height-15 />
              <View row>
                <View  white style={Styles.datumContainer} paddingV-5 paddingH-8 flex-1>
                  <Text h10 textGray>
                    {i18n.t('storeProviderPayments.component.textReference')}
                  </Text>
                  <Text h12 bgBlue02 medium>
                    {payment.data.reference}
                  </Text>
                </View>
                <DivSpace width-10 />
                <View
                  white
                  style={Styles.datumContainer}
                  paddingV-5
                  paddingL-8
                  paddingR-16
                >
                  <Text h10 textGray>
                    {i18n.t('storeProviderPayments.component.previous')}
                  </Text>
                  <Text h10 bgBlue02 medium>
                    {formatDate(payment.date)}
                  </Text>
                </View>
              </View>
            </View>
            
          ))
        )}
      </ScrollView>
    </SignUpWrapper>
  );
};

export default ProviderPaymentSavedScreen;
