import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import { NavigationBar, DivSpace, View, Text, ImageComponent } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import CreditElementDetail from '@screens/credits/components/CreditElementDetail';
import CreditElement from '@screens/credits/components/CreditElement';
import CreditHiredElement from '@screens/credits/components/CreditHiredElement';
import CreditHiredDetail from '@screens/credits/components/CreditHiredDetail';
import imageConfirm from '@assets/brand/imageConfirm.png';
import { scale, verticalScale } from 'react-native-size-matters';
import Styles from './styles';

import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';

const CreditAcceptance = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const credit = navigation.getParam('credit');
  const page = navigation.getParam('page');
  const [showNotific,setShowNotific]=useState(false);
      

  function handlePressBack() {
    navigation.goBack();
  }

  function handlePressAccept() {
    navigation.navigate('AppConfirmationPin', {
      data: { credit },
      next: 'ManualCreditPayment'
    });
  }

  return (
    <SignUpWrapper forceInset={{ bottom: 'never' }}>
      <NavigationBar
        onBack={handlePressBack}
        body={page === 'creditHire'? i18n.t('contractedCredits.component.textCreditsDetails'):i18n.t('creditDetails.component.title')}
      />
      <ScrollView style={{ height: '100%' }}>
        <DivSpace height-15 />
        { showNotific &&(
          <View flex-1 marginH-18>
            <View row bgBlue07 style={Styles.containerNotific}>
              <View centerV centerH marginL-20>
                <ImageComponent
                  source={brandThemeImages?.imageConfirm?brandThemeImages?.imageConfirm:imageConfirm}
                  width={scale(44)}
                  height={verticalScale(51)}
                />
              </View>
              <DivSpace width-15 />
              <View column flex-1 centerV>
                <Text h12 bold white>{i18n.t('contractedCredits.component.textThankYouForPay')}</Text>
                <Text h12 white>{i18n.t('contractedCredits.component.textAutomaticPayGenerate')}</Text>
                <Text h10 textGray>12/02/2020</Text>
              </View>
            </View>
          </View>
        )}
        <DivSpace height-8 />
        <View>
          {page === 'creditHire' ?<CreditHiredElement {...credit} /> :<CreditElement {...credit} />}
          {page === 'creditHire' ?  <CreditHiredDetail {...credit} onAccept={handlePressAccept} /> : <CreditElementDetail {...credit} onAccept={handlePressAccept} />}
          
        </View>
      </ScrollView>
    </SignUpWrapper>
  );
};

CreditAcceptance.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreditAcceptance;
