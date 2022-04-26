import React ,{Fragment,useState}from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import CreditHiredElement from '@screens/credits/components/CreditHiredElement';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import Styles from '../styles';
import { 
  NavigatorHeader, 
  DivSpace, 
  View, 
  Text,
  ButtonRounded,
  ModalDisabled
} from '@components';
import data from '../MyCreditOptions.data';
import i18n from '@utils/i18n';

const CreditsContracted = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;
  const [showModal] = useState(true);
  function handlePressCreditElement(credit) {
    navigation.navigate('CreditAcceptance', { credit ,page: 'creditHire'});
  }
  const handlePressNext =()=>{
    navigation.navigate('MyCreditOptions');
  };

  const creditElements = data.hiredCredits.map((credit, key) => (
    <Fragment key={key}>
      <CreditHiredElement
        {...credit}
        onPress={() => handlePressCreditElement(credit)}
        index={key}
        navigation={navigation}
      />
      <DivSpace height-15 />
    </Fragment>
  ));

  return (
    <SignUpWrapper >
      <NavigatorHeader brandTheme={brandThemeImages} avatarProfile={() => console.log('')} navigation={navigation} />
      <DivSpace height-10 />
      <Text h12 white center>{i18n.t('contractedCredits.component.titleMyContratedCredits')}</Text>
      <DivSpace height-20 />
      {navigation.isFocused() && <ScrollView>
        <DivSpace height-15 />
        {creditElements}
        <DivSpace height-40 />
        <ModalDisabled isOpen={showModal} navigation={navigation}/>
      </ScrollView>}
      <View centerH centerV textBlue01 style={Styles.viewButton}>
        <View centerH centerV textBlue01 style={Styles.buttonSeeCredit}>
          <ButtonRounded onPress={handlePressNext}>
            <Text h10 semibold>
              {i18n.t('contractedCredits.component.textSeeCredits')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </SignUpWrapper>
  );
};

CreditsContracted.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default withNavigationFocus(CreditsContracted);
