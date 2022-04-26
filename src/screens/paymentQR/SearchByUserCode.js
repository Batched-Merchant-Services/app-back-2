import React,{useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import i18n from '@utils/i18n';
import { scale, verticalScale } from 'react-native-size-matters';
import { View, BoxBlue, NavigationBar,Text,DivSpace,AnimateLabelInput,ButtonRounded,SnackBar,Loader } from '@components';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import { saveInfoPayment} from '@store/ducks/user.ducks';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import LocalStorage from '@utils/localStorage';
import { userExternalId } from '@utils/api/switch';
import { useDispatch,useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import IconUserSearchQR from '@utils/iconSVG/IconUserSearchQR';


const RequestInternationalPaymentsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const code = useValidatedInput('code', '');
  const isValid = isFormValid(code);
  const [title,setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [snakVisible, setSnakVisible] = useState(false);
  const [actionAnimated, setActionAnimated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handlePressNext = async ()=>{
    setIsLoadingModal(true);
    const token = await LocalStorage.get('auth_token');
    const response = await userExternalId(token,code.value);
    if (response.code < 400) {
      setTimeout(function(){
        const image =response.data.avatarImage;
        const Name = response.data.firstName;
        const LatsName = response.data.lastName;
        dispatch(saveInfoPayment({ imageUserQRScan: image, fullNameUserQRScan: Name +' '+ LatsName,nameQRScan: Name, lastNameQRScan: LatsName }));
        navigation.navigate('ContactInformation',{page: 'QRCodeSearch',codeExternal: code.value,imageSearch: image, nameSearch: Name, lastName:LatsName});
        setIsLoadingModal(false);
      }, 1000);
      
    }else {
      setIsLoadingModal(true);
      setTimeout(function(){
        setIsLoadingModal(false);
        setSnakVisible(true);
        setButtonNext(true);
        setTitle(response.message);
      }, 1000);
    }
  };
  
  const handleCloseNotif = () => {
    setSnakVisible(false);
    setButtonNext(false);
    setActionAnimated(true);
  };

  return (
    <>
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
              <Text h16 white light center>{i18n.t('sendQRPayments.component.textSearchFor')}<Text semibold white>{' '}{i18n.t('sendQRPayments.component.textCodeTheUser')}</Text></Text>
            </View>
          </BoxBlue>
          <DivSpace height-20 />
          <Text h14 white>{i18n.t('sendQRPayments.component.textWriteCodeTwo')}</Text>
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
        <View centerH  bottom >
          <ButtonRounded size = 'lg' onPress={handlePressNext} disabled={ !isValid && !buttonNext ? true: buttonNext}>
            <Text h10 semibold >
              {i18n.t('sendQRPayments.component.buttonSearch')}
            </Text>
          </ButtonRounded>
        </View>
      </SafeAreaView>
    </SignUpWrapper>
    {isLoadingModal &&(
      <Loader 
        isOpen={true}
        navigation={navigation} />)}
    <SnackBar
      message={title}
      isVisible={snakVisible}
      onClose={handleCloseNotif}
      animationAction={actionAnimated}
    />
    </>
  );
};

export default RequestInternationalPaymentsScreen;
