/* eslint-disable multiline-ternary */
import React,{ useState,useEffect } from 'react';
import { useSelector} from 'react-redux';
import {  SafeAreaView } from 'react-native';
import { moneyFormatter } from '@utils/formatters';
import { requestCard,getFee } from '@utils/api/switch';
import { scale, verticalScale } from 'react-native-size-matters';
import Styles from './styles';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';
import iconCards from '@assets/brand/iconCards.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import {
  ImageComponent,
  View,
  NavigationBar,
  Text,
  DivSpace,
  BoxGradient,
  Link,
  ButtonRounded,
  SnackBar,
  Loader
} from '@components';



async function getFees(
  setShowFee,
) {
  try {
    const token = await LocalStorage.get('auth_token');
    const response = await getFee(token,'physical');
    if (response.code < 400) {
      setShowFee(response.data.amount);
    }
  }
  catch (e) {
    console.log(e);
  }
}

async function requestCards(
  setIsLoadingModal,
  navigation,
  setSnakVisible,
  setTitle
) {
  setIsLoadingModal(true);
  try {
    const token = await LocalStorage.get('auth_token');
    const response = await requestCard(token);
    if (response.code < 400) {
      setTimeout(function () {
        navigation.navigate('ConfirmationRequestCard');
        setIsLoadingModal(false);
      }, 1000);
    }
    else {
      closeSnackNotice(setIsLoadingModal,setSnakVisible, setTitle, response);
    }
  }
  catch (e) {
    console.log(e);
  }
}


function closeSnackNotice(setIsLoadingModal,setSnakVisible, setTitle, response) {
  setIsLoadingModal(true);
  setTimeout(function () {
    setSnakVisible(true);
    setIsLoadingModal(false);
    setTitle(response.message);
  }, 1000);
}


const RequestCard = ({ navigation }) =>   {

  const redux = useSelector(state => state);
  const userData = redux.user;
  const userInfo = userData.infoUser;
  const brandThemeImages = userData?.Theme?.images;
  const addressState =userInfo ? userInfo.address: '';
  const addressFirst =userInfo ? userInfo.address[0]:'';
  const Name =userInfo ? userInfo.firstName:'';
  const lastName =userInfo ? userInfo.lastName:'';
  const address = addressState.length  > 0 ? 
    addressFirst.street+' '+ addressFirst.number+' '+addressFirst.suburb+' '+addressFirst.city+' '+addressFirst.state
    +' '+addressFirst.zipCode :'';
  const [currencyUser]=useState(userData?userData.currencyUser:'');
  const [title, setTitle] = useState('');
  const [showFee, setShowFee] = useState(0);
  const [snakVisible, setSnakVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [ completeProfile ] = useState(addressFirst? true: false);
  const [ buttonDisable ] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        getInfoFee();
      } catch (e) {
        console(e);
      }
    })();
  }, []);


  const getInfoFee = async () => {
    await getFees(
      setShowFee
    );
    
  };

  const handleConfirmation = async () => {
    await requestCards(
      setIsLoadingModal,
      navigation,
      setSnakVisible,
      setTitle
    );
    
  };
  
  const handleProfile = async () => {
    navigation.navigate('MyProfile');
  };
  

  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };


  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={{ flex: 1}} forceInset={{top: 'always'}}>
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('myCards.component.titleRequestCard')}
          onClose={null}
        />
        <DivSpace height-20/>
        <View flex-1 centerH>
          <View centerH textBlueDark paddingH-40 width-327 height-540 style={Styles.containerView}>
            <DivSpace height-30/>
            <Text center h14 white medium>{i18n.t('myCards.component.textRequestCard')}</Text>
            <DivSpace height-15/>
            <View centerH centerV>
              <BoxGradient size={82}>
                <ImageComponent
                  source={brandThemeImages?.iconCards?brandThemeImages?.iconCards:iconCards}
                  width={scale(61)}
                  height={verticalScale(41)}
                />
              </BoxGradient>
            </View>
            {completeProfile
              ? <View>
                <DivSpace height-15/>
                <Text h10 bgGray center>{i18n.t('myCards.component.textFullName')}</Text>
                <Text semibold h12 white center>{Name}</Text>
                <Text semibold h12 white center>{lastName}</Text>
                <DivSpace height-30/>
                <Text h10 bgGray center>{i18n.t('myCards.component.textAddress')}</Text>
                <Text h12 white center>{address}</Text>
                <DivSpace height-30/>
                <Link onPress={handleProfile}>
                  <Text h10 medium title>
                    {i18n.t('myCards.component.linkRightInformation')}
                  </Text>
                </Link>
                <DivSpace height-40/>
              </View>
              :  <View>
                <DivSpace height-40/>
                <Text h12 white center>{i18n.t('myCards.component.textCompleteYourProfile')}</Text>
                <DivSpace height-40/>
                <View  centerH bottom >
                  <ButtonRounded onPress={handleProfile}>
                    <Text h10 semibold>
                      {i18n.t('myCards.component.buttonCompleteMyProfile')}
                    </Text>
                  </ButtonRounded>
                </View>
                <DivSpace height-40/>
              </View>
            }
            <View flex-1 bottom textBlue01 centerH centerV width-327 height-90 style={Styles.containerCompleteP}>
              <Text h10 white center>{i18n.t('myCards.component.textCostOfShipping')}{' '}<Text h10 white center semibold>{moneyFormatter(showFee)}{' '}{currencyUser}</Text></Text>
              <Text h10 white center>{i18n.t('myCards.component.textTheyAreTaken')}<Text orange medium h10>"{i18n.t('myCards.component.textMyWallet')}"</Text></Text>
              <DivSpace height-20/>
              <View  centerH bottom >
                <ButtonRounded onPress={handleConfirmation} disabled={completeProfile?!buttonDisable:buttonDisable}>
                  <Text h10 semibold>
                    {i18n.t('myCards.component.buttonSendCard')}
                  </Text>
                </ButtonRounded>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
    </SignUpWrapper>
  );
};

export default RequestCard;




