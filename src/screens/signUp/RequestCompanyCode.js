import React,{useState} from 'react';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { Linking } from 'react-native';
import {
  NavigationBar,
  DivSpace,
  View,
  BoxBlue,
  ImageComponent,
  Text,
  BoxGradient,
  ButtonRounded
} from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import plane from '@assets/brand/plane.png';
import { useSelector } from 'react-redux';
           
const RequestCompanyCode = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;
  const pinCode = useValidatedInput('pinCode', '');
  const [nameCompany, setNameCompany] = useState('Liverpool SA de CV');
  const isValid = isFormValid(pinCode);

  function handlePressBack() {
    navigation.goBack();
  }

  return (
    <SignUpWrapper>
      <DivSpace height-10 />
      <View flex-1 centerH centerV>
        <BoxBlue containerStyle={{ justifyContent: 'flex-start', alignItems: 'center'}}>
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={i18n.t('signUp.component.labelIDoNotHaveACode')}
            onClose={null}
          />
          <DivSpace height-25 />
          <View paddingH-20 centerH>
            <BoxGradient size={96}>
              <ImageComponent source={brandThemeImages?.plane?brandThemeImages?.plane:plane} width={scale(84)} height={verticalScale(84)}  />
            </BoxGradient>
            <DivSpace height-35 />
            <Text h10 textGray center>{i18n.t('signUp.component.labelIfYouAreInterested')} <Text bold textGray>{' '}{i18n.t('signUp.component.labelNameCompanyPersonal')}</Text></Text>
            <DivSpace height-20 />
            <Text h12 textGray center>{i18n.t('signUp.component.labelEmail')}:</Text>
            <DivSpace height-5 /> 
            <Text h16 white center bold> support@savvywallet.io</Text>
            <DivSpace height-20 />
            <Text h10 textGray center>{i18n.t('signUp.component.labelOnceReceivedWeWill')}</Text>
            <DivSpace height-50 />
            <View centerH>
              <ButtonRounded
                size="lg"
                onPress={() => Linking.openURL('mailto:cardsupport@uulala.io') }
              >
                <Text h10 semibold>
                  {i18n.t('signUp.component.labelSendMail')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
        </BoxBlue>
      </View>
    </SignUpWrapper>
  );
};

export default RequestCompanyCode;
