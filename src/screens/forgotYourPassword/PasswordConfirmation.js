import React from 'react';
import i18n from '@utils/i18n';
import {
  DivSpace,
  ImageComponent,
  NavigationBar,
  Text,
  View,
  BoxBlue,
  ButtonRounded,
  ResizeImageBackground
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { verticalScale } from 'react-native-size-matters';
import { connect, useSelector } from 'react-redux';
import { saveUser } from '@store/ducks/user.ducks';
import passConfirm from '@assets/brand/passConfirm.png';
import background from '@assets/brand/backgroundImage.png';
import Colors from '@styles/Colors';

const PasswordConfirmation = ({ navigation }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;

  const page = navigation.getParam('page');
  function handlePressLogin() {
    navigation.navigate('Configuration');
  }

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <ResizeImageBackground source={background}>
      <DivSpace height-20 />
        <NavigationBar
          disableExtraTop
          onBack={null}
          body={i18n.t('confirmationChangePassword.component.title')}
          onClose={null}
        />
        <View flex-1 centerH>
          <DivSpace height-20 />
          <BoxBlue>
            <DivSpace height-25 />
            <View centerH paddingH-20>
              <Text center white h16 semibold>
                {page ? i18n.t('confirmationChangePassword.component.titleUpdatedPIN') : i18n.t('confirmationChangePassword.component.textUpdatedAccess')}
              </Text>
            </View>
            <DivSpace height-40 />
            <View centerH>
              <ImageComponent
                source={brandThemeImages?.passConfirm ? brandThemeImages?.passConfirm : passConfirm}
                width={verticalScale(60)}
                height={verticalScale(60)}
              />
            </View>
            <DivSpace height-45 />
            <View centerH marginH-35>
              <Text center h12 white>
                {page ? i18n.t('confirmationChangePassword.component.textWouldYouUseItToConfirm') : i18n.t('confirmationChangePassword.component.textYouWillUseIt')}
              </Text>
            </View>
            <View centerH bottom flex-1>
              <View centerH centerV bottom>
                <ButtonRounded onPress={handlePressLogin} size={'lg'}>
                  <Text h10 semibold>
                    {i18n.t('confirmationChangePassword.component.buttonToAccept')}
                  </Text>
                </ButtonRounded>
              </View>

              <DivSpace height-50 />
            </View>
          </BoxBlue>
        </View>
      </ResizeImageBackground>
    </SignUpWrapper>
  );
};
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    saveUser: (data) => dispatch(saveUser(data)),
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordConfirmation);
