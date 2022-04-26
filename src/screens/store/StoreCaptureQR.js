import React from 'react';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  View,
  BoxBlue,
  NavigationBar,
  ImageComponent,
  Text,
  DivSpace,
  AnimateLabelInput,
  ButtonRounded
} from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import IconUserSearchQR from '@utils/iconSVG/IconUserSearchQR';

const StoreCaptureQR = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const code = useValidatedInput('code', '');
  const isValid = isFormValid(code);

  const handlePressNext = () => {
    navigation.navigate('StoreConfirmation');
  };

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('sendQRPayments.component.title')}
        />
        <DivSpace height-15 />
        <View centerH>
          <BoxBlue
            containerStyle={{
              justifyContent: 'flex-start',
              height        : verticalScale(230)
            }}
          >
            <View flex-1 centerH centerV>
              <IconUserSearchQR width={scale(52)} height={verticalScale(52)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
            </View>
            <View flex-1 centerH marginH-70>
              <Text h16 white light center>
                {i18n.t('sendQRPayments.component.textSearchFor')}
                <Text semibold white>
                  {' '}
                  {i18n.t('sendQRPayments.component.textCodeTheUser')}
                </Text>
              </Text>
            </View>
          </BoxBlue>
          <DivSpace height-20 />
          <Text h14 white>
            {i18n.t('sendQRPayments.component.textWriteCodeTwo')}
          </Text>
          <DivSpace height-20 />
        </View>
        <View paddingH-20>
          <AnimateLabelInput
            {...code}
            label={i18n.t('sendQRPayments.component.textCodeUser')}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
        </View>
        <DivSpace height-20 />
        <View centerH bottom>
          <ButtonRounded
            size="lg"
            onPress={handlePressNext}
            disabled={!isValid}
          >
            <Text h10 semibold>
              {i18n.t('sendQRPayments.component.buttonSearch')}
            </Text>
          </ButtonRounded>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default StoreCaptureQR;
