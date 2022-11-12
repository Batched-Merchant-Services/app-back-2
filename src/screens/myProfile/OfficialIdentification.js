import React, { useState, useEffect } from 'react';
import i18n from '@utils/i18n';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  Link,
  Select,
  ImageUploadPiker,
  SnackBar,
  Loader
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { convertImage } from '@utils/formatters';
import * as Animatable from 'react-native-animatable';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getIdentificationsCatalog, updateUserOfficialIdentify } from '@utils/api/switch';
import ImagePicker from 'react-native-image-picker';
import frontID from '@assets/brand/frontID.png';
import backID from '@assets/brand/backID.png';
import check from '@assets/icons/check.png';
import fotoID from '@assets/brand/fotoID.png';
import domicilio from '@assets/brand/c_domicilio.png';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import Styles from './styles';
import IconWarning from '../../utils/iconSVG/IconWarning';
import Colors from '@styles/Colors';
import { cleanErrorProfile, createKYC, editKYC, getTypeIdentification } from '../../store/actions/profile.actions';

const options = {
  title: 'Capture Photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Capture Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



function photoProofOfAddress(setSendProofOfAddress, setProofOfAddress) {
  ImagePicker.showImagePicker(options, async (response) => {
    const { error, uri, data } = response;
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (error) {
      console.log('ImagePicker Error: ', error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      const source = 'data:image/jpeg;base64,' + data;
      const resultBase = await convertImage(source);
      setSendProofOfAddress(resultBase);
      setProofOfAddress(uri);

    }
  });
}


function photoSelfie(setSendPhotoSelfie, setshowPhotoSelfie) {
  ImagePicker.launchCamera(options, async (response) => {
    const { error, uri, data } = response;
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (error) {
      console.log('ImagePicker Error: ', error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      const source = 'data:image/jpeg;base64,' + data;
      const resultBase = await convertImage(source);
      setSendPhotoSelfie(resultBase);
      setshowPhotoSelfie(uri);
    }
  });
}


function photoBack(setSendPhotoBack, setshowPhotoBack) {
  ImagePicker.showImagePicker(options, async (response) => {
    const { error, uri, data } = response;
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (error) {
      console.log('ImagePicker Error: ', error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      const source = 'data:image/jpeg;base64,' + data;
      const resultBase = await convertImage(source);
      setSendPhotoBack(resultBase);
      setshowPhotoBack(uri);
    }
  });
}


function photoFront(setSendPhotoFront, setshowPhotoFront) {
  ImagePicker.showImagePicker(options, async (response) => {
    const { error, uri, data } = response;
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (error) {
      console.log('ImagePicker Error: ', error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      const source = 'data:image/jpeg;base64,' + data;
      const resultBase = await convertImage(source);
      setSendPhotoFront(resultBase);
      setshowPhotoFront(uri);
    }
  });
}


async function updateInfoUser(
  idUser,
  sendPhotoFront,
  sendPhotoBack,
  sendPhotoSelfie,
  OfficialIdent,
  sendProofOfAddress,
  inputIdAddress,
  navigation,
  setIsLoadingModal,
  setSnakVisible,
  setButtonNext,
  setTitle,
  dispatch
) {
  setIsLoadingModal(true);
  const token = await LocalStorage.get('auth_token');
  const response = await updateUserOfficialIdentify(
    token,
    sendPhotoFront,
    sendPhotoBack,
    sendPhotoSelfie,
    OfficialIdent.value.name,
    sendProofOfAddress,
    inputIdAddress,
    idUser);
  if (response.code < 400) {
    setTimeout(function () {
      setIsLoadingModal(false);
      navigation.navigate('MyProfile');
    }, 1000);
  }
  else {
    closeSnackNotice(setIsLoadingModal, setSnakVisible, setButtonNext, setTitle, response);
  }
}

function closeSnackNotice(
  setIsLoadingModal,
  setSnakVisible,
  setButtonNext,
  setTitle,
  response
) {
  setIsLoadingModal(true);
  setTimeout(function () {
    setIsLoadingModal(false);
    setSnakVisible(true);
    setButtonNext(true);
    setTitle(response.message);
  }, 1000);
}



const OfficialIdentification = ({ navigation }) => {

  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const userData = redux?.user;
  const userGraph = redux?.userGraph;
  const profileData = redux?.profile;
  const brandTheme = userData?.Theme?.colors;
  const brandThemeImages = userData?.Theme?.images;
  const userProfile = userGraph?.dataUser?.usersProfile ? userGraph?.dataUser?.usersProfile[0] : '';
  const userInfo = userProfile ? userProfile?.accounts : '';
  const KycState = userInfo?.kyc ? userInfo?.kyc[0] : '';
  const idUser = KycState ? KycState?.id : '';
  const addressState = userInfo ? userInfo?.address : '';
  const imageFrontValue = KycState ? KycState?.frontId ? KycState?.frontId + '?' + new Date() : '' : '';
  const imageBackValue = KycState ? KycState?.backId ? KycState?.backId + '?' + new Date() : '' : '';
  const imageSelfieValue = KycState ? KycState?.faceId ? KycState?.faceId + '?' + new Date() : '' : '';
  const documentId = KycState ? KycState?.documentId ? KycState?.documentId + '?' + new Date() : '' : '';
  const typeIdentif = KycState ? KycState?.typeIdentification : '';

  const inputIdAddress = addressState.length > 0 ? userInfo.address[0].id ? userInfo.address[0].id : '' : '';
  const [dataIdentification, setDataIdentification] = useState([]);
  const [showPhotoFront, setshowPhotoFront] = useState(imageFrontValue);
  const [showPhotoBack, setshowPhotoBack] = useState(imageBackValue);
  const [showPhotoSelfie, setshowPhotoSelfie] = useState(imageSelfieValue);
  const [showProofOfAddress, setProofOfAddress] = useState(documentId);
  const [sendPhotoFront, setSendPhotoFront] = useState('');
  const [sendPhotoBack, setSendPhotoBack] = useState('');
  const [sendPhotoSelfie, setSendPhotoSelfie] = useState('');
  const [sendProofOfAddress, setSendProofOfAddress] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const imageFront = useValidatedInput('file', imageFrontValue);
  const imageBack = useValidatedInput('file', imageBackValue);
  const imageProofAddress = useValidatedInput('file', documentId);
  const imageSelfie = useValidatedInput('file', imageSelfieValue);


  useEffect(() => {
    setIsLoadingModal(false)
  }, [profileData?.successEditKYC])

  useEffect(() => {
    setIsLoadingModal(false)
  }, [profileData?.successCreateKYC])


  // async function identifyCatalogs() {
  //   const token = await LocalStorage.get('auth_token');
  //   const response = await getIdentificationsCatalog(token);
  //   if (response.code < 400) {
  //     setTypeIdentification(response.data);
  //   }

  // }

  
  useEffect(() => {
    dispatch(cleanErrorProfile());
    const countryCode = userInfo?.countryCode;
    dispatch(getTypeIdentification({ countryCode }));
    //getTypeIdentity();
  }, [])

  useEffect(() => {
    if (profileData?.dropDownIdentification) {
      if (profileData?.dropDownIdentification?.length > 0) {
        setDataIdentification(profileData?.dropDownIdentification)
      }
    }
  }, [profileData?.isLoadingTypeIdentification]);

  // useEffect(() => {
  //   let typeLanguage = typeIdentification?.map((item) => {
  //     const billedIdSaved = { name: i18n.t(`${item?.name}`), value: item?.value };
  //     console.log('billedIdSaved', billedIdSaved)
  //     return billedIdSaved;
  //   });
  //   console.log('typeLanguage', typeLanguage)
  //   setDataIdentification(typeLanguage);
  // }, [typeIdentification]);


  const isValid = showPhotoFront && showPhotoBack && showPhotoSelfie;

  function handlePressBack() {
    navigation.goBack();
  }


  const OfficialIdent = useValidatedInput('typeIdentif', typeIdentif === '' || typeIdentif === undefined ? { name: i18n.t('generics.selectOne') } : { name: typeIdentif }, {
    changeHandlerSelect: 'onSelect'
  });
 
  function getDropDown(value) {
    //setIsLoadingModal(true);
    const valueFront = userGraph?.fileFront ? userGraph?.fileFront : KycState?.frontId;
    const valueBack = userGraph?.fileBack  ? userGraph?.fileBack : KycState?.backId;
    const valueFaceId =  userGraph?.fileSelfie  ? userGraph?.fileSelfie  : KycState?.faceId;
    const valueDocumentId = userGraph?.fileAddress  ? userGraph?.fileAddress : KycState?.documentId;
    const valueTypeIdent = value?.name  ? value?.name : KycState?.typeIdentification;
    const isComplete = (valueFront?true:false)&&(valueBack?true:false)&&(valueFaceId?true:false)&&(valueDocumentId?true:false)&&(valueTypeIdent?true:false);

    if (userInfo?.kyc?.length > 0 ) {
      const dataUpdateKYC = {
        id: KycState?.id ?? "",
        accountId: userProfile.accountId ?? "",
        frontId: valueFront ?? "",
        backId: valueBack ?? "",
        faceId: valueFaceId ?? "",
        typeIdentification: valueTypeIdent ?? "",
        documentId: valueDocumentId ?? "",
        kycid: KycState?.kycid ?? "0",
        isComplete: isComplete,
        ip:''
      }
      dispatch(editKYC({ dataUpdateKYC }))
    } else {

      const dataCreateKYC = {
        accountId: userProfile.accountId ?? "",
        frontId: valueFront ?? "",
        backId: valueBack ?? "",
        faceId: valueFaceId ?? "",
        typeIdentification: valueTypeIdent ?? "",
        documentId: valueDocumentId ?? "",
        status: "0",
        kycid: KycState?.kycid ?? "0",
        isComplete: isComplete,
        ip:''
      }
      dispatch(createKYC({ dataCreateKYC }))
    }
  }

  //console.log('profileData',profileData?.isLoadingEditKYC)

  useEffect(() => {
    setIsLoadingModal(profileData?.isLoadingEditKYC);
  }, [profileData?.isLoadingEditKYC]);

  useEffect(() => {
    setIsLoadingModal(profileData?.isLoadingCreateKYC);
  }, [profileData?.isLoadingCreateKYC]);


  const handleChoosePhotoFront = () => {
    photoFront(setSendPhotoFront, setshowPhotoFront);
  };

  const handleChoosePhotoBack = () => {
    photoBack(setSendPhotoBack, setshowPhotoBack);
  };

  const handleChoosePhotoSelfie = () => {
    photoSelfie(setSendPhotoSelfie, setshowPhotoSelfie);

  };

  const handleChooseProofOfAddress = () => {
    photoProofOfAddress(setSendProofOfAddress, setProofOfAddress);
  };

  async function handlePressNext() {

    await updateInfoUser(
      idUser,
      sendPhotoFront,
      sendPhotoBack,
      sendPhotoSelfie,
      OfficialIdent,
      sendProofOfAddress,
      inputIdAddress,
      navigation,
      setIsLoadingModal,
      setSnakVisible,
      setButtonNext,
      setTitle,
      dispatch
    );
  }
  function getValueLoading(value) {
    console.log('getValueLoading',value);
  }
  


  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <SignUpWrapper>
      <NavigationBar onBack={handlePressBack} body={i18n.t('myProfile.component.OfficialIdentification.title')} />
      <ScrollView>
        <SafeAreaView forceInset={{ top: 'always' }}>
          <DivSpace height-10 />
          <View row centerH>
            <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
            <DivSpace width-6 />
            <View width-6 height-6 bgGray style={{ borderRadius: 6 }}></View>
            <DivSpace width-6 />
            <View width-6 height-6 bgOrange02 style={{ borderRadius: 6 }}></View>
          </View>
          <DivSpace height-25 />
          <View flex-1>
            <View paddingH-20>
              <Text h12 white>
                {i18n.t('myProfile.component.OfficialIdentification.textIdentification')}
              </Text>
              <DivSpace height-10 />
              <Text h12 white>
                {i18n.t('myProfile.component.OfficialIdentification.textToBeApproved')}
              </Text>
              <DivSpace height-20 />
              <Select
                {...OfficialIdent}
                label={i18n.t('myProfile.component.OfficialIdentification.textTypeOfOfficial')}
                options={dataIdentification}
                onFill={(value)=>getDropDown(value)}
              />
              <DivSpace height-7 />
              {/* { showPhotoFront === null || showPhotoFront === ''  ?
                <TouchableOpacity onPress={handleChoosePhotoFront} >
                  <View centerH centerV height-190 textBlue01 style={Styles.containerId}>
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <ImageComponent
                        source={brandThemeImages?.frontID?brandThemeImages?.frontID:frontID}
                        width={scale(214)}
                        height={verticalScale(135)}
                      />
                    </Animatable.View>
                  </View>
                  <View  centerH centerV height-20 textBlueDark style={Styles.containerBottomId}>
                    <Text h10 white semibold>
                      {i18n.t('myProfile.component.OfficialIdentification.textFrontID')}
                    </Text>
                  </View>
                </TouchableOpacity>
                :
                <View>
                  <View style={warningFrontCard ? [Styles.warningBorder,{ borderColor: brandTheme.bgOrange02??Colors.bgOrange02}] : aceptCardFront ? [Styles.aceptBorder,{ borderColor: brandTheme.green??Colors.green}]: null}>

                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={handleChoosePhotoFront}>
                        <View centerH centerV height-190 textBlue01 style={Styles.containerValidateId}>
                          <Animatable.View animation="zoomIn" delay={200} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageComponent
                              source={{uri: showPhotoFront}}
                              width={scale(310)}
                              height={verticalScale(146)}
                            />
                          </Animatable.View>
                        </View>
                        <View  textBlueDark centerH centerV height-20 style={warningFrontCard ? [Styles.warningCard,{ backgroundColor: brandTheme.bgOrange02??Colors.bgOrange02}] :aceptCardFront ? [Styles.aceptCard,{ backgroundColor: brandTheme.green??Colors.green}] : Styles.containerBottomId}>
                          <Text h10 white semibold>
                            {i18n.t('myProfile.component.OfficialIdentification.textFrontID')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                  <View right>
                    <View centerH centerV width-24 height-24 style={aceptCardFront? Styles.accept : warningFrontCard? Styles.warning:null}>
                      {aceptSelfieBack&&(
                        <ImageComponent
                          white
                          source={check}
                          width={scale(11)}
                          height={verticalScale(9)}
                        />
                      )}
                      {warningSelfieCard&&(
                        <IconWarning width={scale(13)} height={verticalScale(13)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                      )}
                    </View>
                  </View>
                </View>
              } */}
              <ImageUploadPiker
                {...imageFront}
                label={i18n.t('myProfile.component.OfficialIdentification.textFrontID')}
                ImageEmpty={brandThemeImages?.frontID ? brandThemeImages?.frontID : frontID}
                typeImage='front'
                onfillLoading={(value) => getValueLoading(value)}
              />
              <DivSpace height-15 />
              <ImageUploadPiker
                {...imageBack}
                label={i18n.t('myProfile.component.OfficialIdentification.textBackID')}
                ImageEmpty={brandThemeImages?.backID ? brandThemeImages?.backID : backID}
                typeImage='back'
                onfillLoading={(value) => setIsLoadingModal(value)}
              />
              <DivSpace height-15 />
              <ImageUploadPiker
                {...imageSelfie}
                label={i18n.t('myProfile.component.OfficialIdentification.textYourPhoto')}
                ImageEmpty={brandThemeImages?.selfie ? brandThemeImages?.selfie : fotoID}
                typeImage='selfie'
                onfillLoading={(value) => setIsLoadingModal(value)}
              />
              <DivSpace height-15 />
              <ImageUploadPiker
                {...imageProofAddress}
                label={i18n.t('myProfile.component.OfficialIdentification.textYourProofOfAddress')}
                ImageEmpty={brandThemeImages?.address ? brandThemeImages?.address : domicilio}
                typeImage='address'
                onfillLoading={(value) => setIsLoadingModal(value)}

              />

              {/* {warningFrontCard  ? 
                <View>
                  <DivSpace height-10/>
                  <View row centerH centerV>
                    <IconWarning width={scale(20)} height={verticalScale(20)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                    <DivSpace width-5/>
                    <Text h10 orange>{i18n.t('myProfile.component.OfficialIdentification.textRejectedImproves')}</Text>
                  </View>
                </View>
                :
                null
              }
              { showPhotoBack === null || showPhotoBack === ''?
                <TouchableOpacity onPress={handleChoosePhotoBack}>
                  <View centerH centerV height-190 textBlue01 style={Styles.containerId}>
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <ImageComponent
                        source={brandThemeImages?.backID?brandThemeImages?.backID:backID}
                        width={scale(214)}
                        height={verticalScale(135)}
                      />
                    </Animatable.View>
                  </View>
                  <View centerH centerV height-20 textBlueDark style={Styles.containerBottomId}>
                    <Text h10 white semibold>
                      {i18n.t('myProfile.component.OfficialIdentification.textBackID')}
                    </Text>
                  </View>
                </TouchableOpacity>
                :
                <View>
                  <View style={warningBackCard ? [Styles.warningBorder,{ borderColor: brandTheme.bgOrange02??Colors.bgOrange02}] : aceptCardBack ? [Styles.aceptBorder,{ borderColor: brandTheme.green??Colors.green}]: null}>
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={handleChoosePhotoBack}>
                        <View centerH centerV height-190 textBlue01 style={Styles.containerValidateId}>
                          <Animatable.View animation="zoomIn" delay={200} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageComponent
                              source={{uri: showPhotoBack}}
                              width={scale(310)}
                              height={verticalScale(146)}
                            />
                          </Animatable.View>
                        </View>
                        <View  textBlueDark centerH centerV height-20 style={warningBackCard ? [Styles.warningCard,{ backgroundColor: brandTheme.bgOrange02??Colors.bgOrange02}] :aceptCardBack ? [Styles.aceptCard,{ backgroundColor: brandTheme.green??Colors.green}] : Styles.containerBottomId}>
                          <Text h10 white semibold>
                            {i18n.t('myProfile.component.OfficialIdentification.textBackID')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                  <View right>
                    <View centerH centerV width-24 height-24 style={aceptCardBack? Styles.accept : warningBackCard? Styles.warning:null}>
                      {aceptSelfieBack&&(
                        <ImageComponent
                          white
                          source={check}
                          width={scale(11)}
                          height={verticalScale(9)}
                        />
                      )}
                      {warningSelfieCard&&(
                        <IconWarning width={scale(13)} height={verticalScale(13)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                      )}
                    </View>
                  </View>
                </View>
              }
              {warningBackCard  ? 
                <View>
                  <DivSpace height-10/>
                  <View row centerH centerV>
                    <IconWarning width={scale(20)} height={verticalScale(20)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                    <DivSpace width-5/>
                    <Text h10 orange>{i18n.t('myProfile.component.OfficialIdentification.textRejectedImproves')}</Text>
                  </View>
                </View>
                :
                null
              }
              <DivSpace height-25 />
              { showPhotoSelfie === null  || showPhotoSelfie === ''?
                <TouchableOpacity onPress={handleChoosePhotoSelfie}>
                  <View centerH height-190 textBlue01 style={Styles.containerId}>
                    <DivSpace height-15 />
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <ImageComponent
                        source={brandThemeImages?.selfie?brandThemeImages?.selfie:fotoID}
                        width={scale(250)}
                        height={verticalScale(160)}
                      />
                    </Animatable.View>
                  </View>
                  <View  centerH centerV height-20 textBlueDark style={Styles.containerBottomId}>
                    <Text h10 white semibold>
                      {i18n.t('myProfile.component.OfficialIdentification.textYourPhoto')}
                    </Text>
                  </View>
                </TouchableOpacity>
                :

                <View>
                  <View style={warningSelfieCard ? [Styles.warningBorder,{ borderColor: brandTheme.bgOrange02??Colors.bgOrange02}] : aceptSelfieBack ? [Styles.aceptBorder,{ borderColor: brandTheme.green??Colors.green}]: null}>
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={handleChoosePhotoSelfie}>
                        <View centerH centerV height-190 textBlue01 style={Styles.containerValidateId}>
                          <Animatable.View animation="zoomIn" delay={200} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageComponent
                              source={{uri: showPhotoSelfie}}
                              width={scale(310)}
                              height={verticalScale(146)}
                            />
                          </Animatable.View>
                        </View>
                        <View  textBlueDark centerH centerV height-20 style={warningSelfieCard ? [Styles.warningCard,{ backgroundColor: brandTheme.bgOrange02??Colors.bgOrange02}] :aceptSelfieBack ? [Styles.aceptCard,{ backgroundColor: brandTheme.green??Colors.green}] : Styles.containerBottomId}>
                          <Text h10 white semibold>
                            {i18n.t('myProfile.component.OfficialIdentification.textYourPhoto')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                  <View right>
                    <View centerH centerV width-24 height-24 style={aceptSelfieBack? Styles.accept : warningSelfieCard? Styles.warning:null}>
                      {aceptSelfieBack&&(
                        <ImageComponent
                          white
                          source={check}
                          width={scale(11)}
                          height={verticalScale(9)}
                        />
                      )}
                      {warningSelfieCard&&(
                        <IconWarning width={scale(13)} height={verticalScale(13)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                      )}
                    </View>
                  </View>
                </View>
              }
              {warningSelfieCard ? 
                <View>
                  <DivSpace height-10/>
                  <View row centerH centerV>
                    <IconWarning width={scale(20)} height={verticalScale(20)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                    <DivSpace width-5/>
                    <Text h10 orange>{i18n.t('myProfile.component.OfficialIdentification.textRejectedImproves')}</Text>
                  </View>
                </View>
                :
                null
              }
              <DivSpace height-25/>
              { showProofOfAddress === null  || showProofOfAddress === ''?
                <TouchableOpacity onPress={handleChooseProofOfAddress}>
                  <View centerH height-190 textBlue01 style={Styles.containerId}>
                    <DivSpace height-15 />
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <ImageComponent
                        source={brandThemeImages?.address?brandThemeImages?.address:domicilio}
                        width={scale(175)}
                        height={verticalScale(160)}
                      />
                    </Animatable.View>
                  </View>
                  <View  centerH centerV height-20 textBlueDark style={Styles.containerBottomId}>
                    <Text h10 white semibold>
                      {i18n.t('myProfile.component.OfficialIdentification.textYourProofOfAddress')}
                    </Text>
                  </View>
                </TouchableOpacity>
                :

                <View>
                  <View style={warningProfOfAddress ? [Styles.warningBorder,{ borderColor: brandTheme.bgOrange02??Colors.bgOrange02}] : aceptProfOfAddress ? [Styles.aceptBorder,{ borderColor: brandTheme.green??Colors.green}]: null}>
                    <Animatable.View animation="fadeIn" delay={100} style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={handleChooseProofOfAddress}>
                        <View centerH centerV height-190 textBlue01 style={Styles.containerValidateId}>
                          <Animatable.View animation="zoomIn" delay={200} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ImageComponent
                              source={{uri: showProofOfAddress}}
                              width={scale(310)}
                              height={verticalScale(146)}
                            />
                          </Animatable.View>
                        </View>
                        <View  textBlueDark centerH centerV height-20 style={warningProfOfAddress ? [Styles.warningCard,{ backgroundColor: brandTheme.bgOrange02??Colors.bgOrange02}] :aceptProfOfAddress ? [Styles.aceptCard,{ backgroundColor: brandTheme.green??Colors.green}] : Styles.containerBottomId}>
                          <Text h10 white semibold>
                            {i18n.t('myProfile.component.OfficialIdentification.textYourProofOfAddress')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                  <View right>
                    <View centerH centerV width-24 height-24 style={aceptProfOfAddress? Styles.accept : warningProfOfAddress? Styles.warning:null}>
                      {aceptSelfieBack&&(
                        <ImageComponent
                          white
                          source={check}
                          width={scale(11)}
                          height={verticalScale(9)}
                        />
                      )}
                      {warningSelfieCard&&(
                        <IconWarning width={scale(13)} height={verticalScale(13)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                      )}
                    </View>
                  </View>
                </View>
              }
              {warningProfOfAddress ? 
                <View>
                  <DivSpace height-10/>
                  <View row centerH centerV>
                    <IconWarning width={scale(20)} height={verticalScale(20)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>
                    <DivSpace width-5/>
                    <Text h10 orange>{i18n.t('myProfile.component.OfficialIdentification.textRejectedImproves')}</Text>
                  </View>
                </View>
                :
                null
              }
              <DivSpace height-15/> */}
              <Text h12 white>
                {i18n.t('myProfile.component.OfficialIdentification.textIfThePhotos')}
              </Text>
              <DivSpace height-15 />
              <View height-1 textBlue01 />
              <DivSpace height-15 />
              <Text h10 textGray>{i18n.t('myProfile.component.labelTheInformationRequested')}</Text>
              <Text h10 textGray>{i18n.t('myProfile.component.labelYourInformation')}<Text bold white>{' '}{i18n.t('myProfile.component.labelItIsProtected')}</Text></Text>
              <DivSpace height-15 />
              <View left>
                <Link onPress={() => { }}>
                  <Text h13 medium bgBlue06>
                    {i18n.t('myProfile.component.linkNoticeOfPrivacy')}
                  </Text>
                </Link>
              </View>
              <DivSpace height-15 />
              <Text h10 textGray>{i18n.t('myProfile.component.OfficialIdentification.textVerifyYourInformation')}</Text>
              <DivSpace height-20 />
              <View row>
                {/* <View flex-1  >
                  <View centerH centerV bottom>
                    <ButtonRounded size='lg' onPress={handlePressNext} disabled={!isValid}>
                      <Text h10 semibold>
                        {i18n.t('myProfile.component.buttonSaveAndFinish')}
                      </Text>
                    </ButtonRounded>
                    <DivSpace height-15 />
                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
      {isLoadingModal && (
        <Loader
          isOpen={true}
          navigation={navigation} />)}
    </SignUpWrapper>
  );
};

export default OfficialIdentification;



