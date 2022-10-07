/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageComponent,
  NavigationBar,
  DivSpace,
  Link
} from '@components';
import { 
  TouchableOpacity,
  ImageBackground, 
  Animated,Image,
} from 'react-native';
import i18n from '@utils/i18n';
import Styles from './styles';
import LocalStorage from '@utils/localStorage';
import ImagePicker from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useDispatch,useSelector } from 'react-redux';
import { verifyToken } from '@utils/api/switch';
import { Bubbles } from 'react-native-loader';
import { SafeAreaView } from 'react-navigation';
import { convertImage } from '@utils/formatters';
import { NavigationEvents } from 'react-navigation';
import { updateProfileImage } from '@utils/api/switch';
import { saveInfoPayment} from '@store/ducks/user.ducks';
import { ScrollView } from 'react-native-gesture-handler';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';

const information = require('@assets/icons/information.png');
const rowRight = require('@assets/icons/rowRight.png');
const complete = require('@assets/icons/complete.png');
const HEADER_MAX_HEIGHT = verticalScale(302);
const HEADER_MIN_HEIGHT = verticalScale(90);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const options = {
  title         : 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path      : 'images',
  },
};



function selectAvatar(setShowPhoto, setShowImage,setIsLoadingModal) {
  ImagePicker.showImagePicker(options, async (response) => {
    const { uri, data } = response;
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      setIsLoadingModal(true);
      const sourceURI = { uri: uri };
      const source = 'data:image/jpeg;base64,' + data;
      const resultBase = await convertImage(source);
      const token = await LocalStorage.get('auth_token');
      const responseImage = await updateProfileImage(token, resultBase);
      setShowPhoto(sourceURI);
      setShowImage(true);
      if (responseImage.code < 400) {
        setTimeout(function () {
          setIsLoadingModal(false);
        }, 1000);
      }
      else {
        setTimeout(function () {
          setIsLoadingModal(false);
        }, 1000);
      }
    }
  });
}

async function getInfoUser(
  setShowPhoto,
  setShowImage, 
  setName, 
  setLastName, 
  setId, 
  setAlias,
  dispatch
) {
  const token = await LocalStorage.get('auth_token');
  const verifyResponse = await verifyToken(token);
  if (verifyResponse.code < 400) {
    setShowPhoto({ uri: verifyResponse.data.user.account.avatarImage + '?' + new Date() });
    if (verifyResponse.data.user.account.avatarImage !== '') {
      setShowImage(true);
    }
    else {
      setShowImage(false);
    }
    setName(verifyResponse.data.user.account.firstName +' '+ verifyResponse.data.user.account.middleName);
    setId(verifyResponse.data.user.id);
    setAlias(verifyResponse.data.user.account.alias);
    setLastName(verifyResponse.data.user.account.lastName);
    dispatch(saveInfoPayment({
      infoUser: verifyResponse.data.user.account,
      idUser  : verifyResponse.data.user.id
    }));
  }
}


const myProfile = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const AnimateV =new Animated.Value(0);
  const dispatch = useDispatch();
  const [id,setId] = useState('');
  const [scrollY] = useState(AnimateV);
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [lastName, setLastName] = useState('');
  const [showImage, setShowImage ] = useState(false);
  const [showPhoto, setShowPhoto ] = useState(null);
  const [profileComplete] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const imageOpacity = scrollY.interpolate({
    inputRange : [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange : [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });
  const headerHeight = scrollY.interpolate({
    inputRange : [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    getVerifyToken();
  }, []);


  async function getVerifyToken() {

    await getInfoUser(
      setShowPhoto, 
      setShowImage, 
      setName, 
      setLastName, 
      setId, 
      setAlias,
      dispatch
    ); 
  }

  const handleChoosePhoto = async() => {
    selectAvatar(setShowPhoto, setShowImage,setIsLoadingModal);
  };


  function handleInformation() {
    navigation.navigate('PersonalInformation');
  }
  function handleContactInformation() {
    navigation.navigate('ContactInformationProfile');
  }
  function handleWorkinInform() {
    navigation.navigate('WorkingInformation');
  }
  function handleBankInform() {
    navigation.navigate('BankInformation');
  }
  function handleOfficialIdentif() {
    navigation.navigate('OfficialIdentification');
  }


  return (
    <SignUpWrapper >
      <SafeAreaView forceInset={{top: 'always'}}>
        <ScrollView scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }]
          )}>
          <View flex-1 marginH-25 style={{marginTop: verticalScale(360)}}>
            <View row >
              <View flex-1>
                <Text h16 medium white>{i18n.t('myProfile.component.labelYourInformation')}</Text>
              </View> 
              <View centerH centerV white style={Styles.buttonInformation}>
                <ImageComponent
                  bgBlue01
                  source={information}
                  height={verticalScale(12)}
                  width={scale(12)}
                />
              </View>
            </View>
            <DivSpace height-10 />
            <Text h10 textGray>{i18n.t('myProfile.component.textFillInYourInformation')}</Text>
            <DivSpace height-20 />
            <TouchableOpacity onPress={handleInformation}>
              <View  row>
                <View flex-1>
                  <Text h14 white medium>{i18n.t('myProfile.component.textPersonalInformation')}</Text>
                  <DivSpace height-5 />
                  {/* <StatusProfile status='warning'/> */}
                </View>
                <View flex-1 right centerV >
                  <ImageComponent
                    white
                    source={rowRight}
                    height={verticalScale(12)}
                    width={scale(12)}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View height-1 bgBlue06/>
            </TouchableOpacity>
            <DivSpace height-20 />
            <TouchableOpacity onPress={handleContactInformation}>
              <View  row>
                <View flex-1>
                  <Text h14 white medium>{i18n.t('myProfile.component.textContactInformation')}</Text>
                  <DivSpace height-5 />
                </View>
                <View flex-1 right centerV >
                  <ImageComponent
                    white
                    source={rowRight}
                    height={verticalScale(12)}
                    width={scale(12)}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View height-1 bgBlue06/>
            </TouchableOpacity>
            <DivSpace height-20 />
            <TouchableOpacity onPress={handleOfficialIdentif}>
              <View  row>
                <View flex-1>
                  <Text h14 white medium>{i18n.t('myProfile.component.textOfficialIdentification')}</Text>
                  <DivSpace height-5 />
                </View>
                <View flex-1 right centerV >
                  <ImageComponent
                    white
                    source={rowRight}
                    height={verticalScale(12)}
                    width={scale(12)}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View height-1 bgBlue06/>
            </TouchableOpacity>
            {/* <DivSpace height-20 />
            <TouchableOpacity onPress={handleWorkinInform}>
              <View  row>
                <View flex-1>
                  <Text h14 white medium>{i18n.t('myProfile.component.textWorkingInformation')}</Text>
                  <DivSpace height-5 />
                </View>
                <View flex-1 right centerV >
                  <ImageComponent
                    white
                    source={rowRight}
                    height={verticalScale(12)}
                    width={scale(12)}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View height-1 bgBlue06/>
            </TouchableOpacity>
            <DivSpace height-20 />
            <TouchableOpacity onPress={handleBankInform}>
              <View  row>
                <View flex-1>
                  <Text h14 white medium>{i18n.t('myProfile.component.textBankInformation')}</Text>
                  <DivSpace height-5 />
                </View>
                <View flex-1 right centerV >
                  <ImageComponent
                    white
                    source={rowRight}
                    height={verticalScale(12)}
                    width={scale(12)}
                  />
                </View>
              </View>
              <DivSpace height-10 />
              <View height-1 bgBlue06/>
            </TouchableOpacity> */}
            <DivSpace height-30 />
            <Text h10 textGray>{i18n.t('myProfile.component.textItIsVeryImportantThat')}</Text>
            <DivSpace height-15 />
            <View flex-1 bottom left>
              <Link onPress={() => {}}>
                <Text h13 medium bgBlue06>
                  {i18n.t('myProfile.component.textNoticeOfPrivacy')}
                </Text>
              </Link>
              {/* <DivSpace height-5 />
              <Link onPress={() => {}}>
                <Text h13 medium bgBlue06>
                  {i18n.t('myProfile.component.textTermsAndConditions')}
                </Text>
              </Link> */}
            </View>
          </View>
          <DivSpace height-25 />
        </ScrollView>
       
        <Animated.View  style={[Styles.header, { height: headerHeight, backgroundColor: brandTheme.bgBlue01??Colors?.bgBlue01 }]}>
          <Animated.View
            style={[
              Styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[brandTheme.textBlueDark??Colors.textBlueDark,brandTheme.textBlue01??Colors.textBlue01]}
              style={{height: verticalScale(330)}}
            >
              <Animatable.View animation="zoomIn" delay={300} >
                <ImageBackground source={{ uri: showImage ? showPhoto.uri : null}} style={{ width: '100%',  height: verticalScale(330), opacity: 0.1}} />
                <View style={{ opacity: 1, marginTop: verticalScale(-250) }}>
                  <Animatable.View animation="zoomIn" delay={300} centerH centerV style={{ margin: 10, opacity: 1 }}>
                    {showImage ?
                      <View centerH>
                        {isLoadingModal &&(
                          <View height-200 centerH centerV >
                            <Bubbles size={12} color={brandTheme.bgOrange02??Colors?.bgOrange02}  />
                          </View>
                        )}
                        {!isLoadingModal &&(
                          <Animatable.View animation="zoomIn" delay={300} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={handleChoosePhoto}>
                              <View style={Styles.photoProfile}>
                                <Image source={{ uri: showPhoto.uri }} style={Styles.imageProfileNull}/>
                              </View>
                            </TouchableOpacity>
                            <DivSpace height-15 />
                            <Text semibold white h16>{name}</Text>
                            <Text regular white h16>{lastName}</Text>
                            <Text semibold h12 orange> ID: {id}</Text>
                          </Animatable.View>
                          
                        )}
                      </View>
                      :
                      <View style={{width: '100%'}}>
                        <View  centerH centerV >
                          <TouchableOpacity onPress={handleChoosePhoto}>
                            <View centerH centerV marginH-10 style={[Styles.photoProfileNull,{borderColor: brandTheme.bgGray??Colors.bgGray}]}>
                              <Text center bold disabled style={{fontSize: 48}}>{alias}</Text>
                              <Text textGray h12 center>{i18n.t('myProfile.component.textAddProfilePhoto')}</Text>
                            </View>
                          </TouchableOpacity>
                          <DivSpace height-15 />
                          <Text semibold white h16>{name}</Text>
                          <Text regular white h16>{lastName}</Text>
                          <Text semibold h12 orange> ID: {id}</Text>
                        </View>
                      </View>
                    }
                  </Animatable.View>
                </View>
              </Animatable.View>
            </LinearGradient>
          </Animated.View> 
          <View style={Styles.navBarIOS}>
            <NavigationBar
              white
              onBack={() => navigation.goBack()}
              body={<Text semibold h14 center white>{i18n.t('myProfile.component.title')}</Text>}
              onClose={null}
            />
            <View>
              <View centerH row>
                {profileComplete&&(
                  <View>
                    <ImageComponent
                      source={complete}
                      height={verticalScale(12)}
                      width={scale(12)}
                    />
                    <DivSpace width-5 />
                    <Text h10 medium green>{i18n.t('myProfile.component.title')}</Text>
                  </View>
                )}
                <DivSpace height-5 />
              </View>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
      <NavigationEvents
        onWillFocus={payload => {
          getVerifyToken(payload);
        }}
      />
    </SignUpWrapper>
  );
};

export default myProfile;


