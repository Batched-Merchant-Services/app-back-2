import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  View,
  ImageComponent,
  ImageAvatar,
  Text,
  BoxBlue,
  DivSpace,
  NavigationBar,
  AnimateLabelAmount,
  AnimateLabelInput,
  Select,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import startDisable from '@assets/icons/startDisable.png';
import i18n from '@utils/i18n';

const countries = [
  { label: 'México', emoji: 'flag-mx', value: 'mexico' },
  { label: 'United States', emoji: 'flag-us', value: 'usa' }
];

const RequestInternationalPaymentsScreen = ({ navigation }) => {

  const amount = useValidatedInput('amount', '');
  const concept = useValidatedInput('concept', '');
  const country = useValidatedInput('country', countries[0], {
    changeHandlerSelect: 'onSelect'
  });
  const isValid = isFormValid(country, amount, concept);

  const handlePressNext=()=>{
    navigation.navigate('ConfirmationRequestSend');
  };
  return (
    <SignUpWrapper>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('requestInternationalPayments.component.title')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue containerStyle={{ justifyContent: 'flex-start', height: verticalScale(288)}}>
            <DivSpace height-3/>
            <View right marginR-15 >
              <ImageComponent bgBlue01 source={startDisable} width={scale(32)} height={verticalScale(30)}  />
            </View>
            <View centerH>
              <ImageAvatar
                source={''}
                width={78} 
                height={78}
              />
              <DivSpace height-12 />
              <Text H16 white semibold>FERNANDO MORALES</Text>
              <DivSpace height-5 />
              <Text H10 regular bgGray>015523033632</Text>
            </View>
            <DivSpace height-3 />
            <View  marginH-70>
              <AnimateLabelAmount
                {...amount}
                label={i18n.t('requestInternationalPayments.component.labelInpuAmount')+':'}
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
            </View>
          </BoxBlue>
        </View>
        <View  marginH-22>
          <DivSpace height-20 />
          <AnimateLabelInput
            {...concept}
            label={i18n.t('requestInternationalPayments.component.textConcept')}
            keyboardType={'default'}
            autoCapitalize={'none'}
            multiline
            multiInput
          />
          <DivSpace height-10 />
          <Select
            {...country}
            label={i18n.t('requestInternationalPayments.component.textCountryWhereyourContact')}
            options={countries}
            size="sm"
          />
        </View>
        <View height-120 centerH  bottom >
          <ButtonRounded  onPress={handlePressNext} disabled={!isValid}>
            <Text h10 semibold>
              {i18n.t('requestInternationalPayments.component.buttonRequestPay')}
            </Text>
          </ButtonRounded>
          <DivSpace height-52 />
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default RequestInternationalPaymentsScreen;
