import React,{useEffect,useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { infoAboutSavvy } from '@utils/api/switch';
import { Platform,Linking } from 'react-native';
import { scale ,verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import LocalStorage from '@utils/localStorage';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';
import copyBlue from '@assets/icons/copyBlue.png';
import { 
  View,
  DivSpace,
  NavigationBar,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonRounded,
  Link 
} from '@components';

const AboutSavvy = ({ navigation }) => {
  const [icon, setIcon] = useState(null);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [copyRigth, setCopyRigth] = useState('');
  const [privacity, setPrivacity] = useState('');
  const [description, setDescription] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo(){
    try {
      const token = await LocalStorage.get('auth_token');
      const response = await infoAboutSavvy(token);
      if (response.code < 400) {
        setIcon(response.data.icon);
        setLink(response.data.link);
        setPrivacity(response.data.privacyPolicy);
        setTitle(response.data.title);
        setCopyRigth(response.data.copyRigth);
        setSubTitle(response.data.subTitle);
        setDescription(response.data.description);
        setDescription2(response.data.description2);
        setDescription3(response.data.description3);
      } 
      
    } catch (e) {
      
    }
  }
  const openSite = () => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };
  const linkPrivacity = () => {
    Linking.canOpenURL(privacity).then(supported => {
      if (supported) {
        Linking.openURL(privacity);
      } else {
        console.log("Don't know how to open URI: " + privacity);
      }
    });
  };


  return (
    <SignUpWrapper >
      { Platform.OS === 'ios' ? <DivSpace height-28 /> : null}
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('AboutSavvy.component.title')}
        onClose={null}
      />
      <SafeAreaView style={Styles.viewInfoCntc} forceInset={{top: 'always'}}>
        <DivSpace height-15 />
        <BoxBlue containerStyle={Styles.containerView}>
          <View flex-1 centerH >
            <DivSpace height-23 />
            <Text center white h16 semibold width-200>
              {title}
            </Text>
            <DivSpace height-15 />
            <ImageComponent source={{uri: icon}} width={scale(120)} height={verticalScale(120)}/>
            <DivSpace height-15 />
            <View marginH-30>
              <Text h12 white center>
                {subTitle}
              </Text>
              <DivSpace height-20 />
              <Text h10 white center>
                {description}
              </Text>
              <DivSpace height-20 />
              <Text h10 white center>
                {description2}
              </Text>
              <DivSpace height-20 />
              <Text h10 white center>
                {description3}
              </Text>
              <DivSpace height-25 />
              <View centerH centerV>
                <ButtonRounded onPress={openSite}>
                  <Text h12 semibold>
                    {i18n.t('AboutSavvy.component.buttonUuulalaio')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-25 />
              <Text center h10 textGray>
                {i18n.t('AboutSavvy.component.textVersionApp')}{' '}
              </Text>
            </View>
          </View>
        </BoxBlue>
        <DivSpace height-20 />
        <View marginH-20>
          <Text center h10 textGray>
            {copyRigth}
          </Text>
        </View>
        <DivSpace height-10 />
        <View row>
          <ImageComponent
            bgBlue06
            source={copyBlue}
            width={scale(18)}
            height={verticalScale(18)}
          />
          <DivSpace width-5/>
          <Link onPress={linkPrivacity}>
            <Text h10 medium title>
              {i18n.t('AboutSavvy.component.linkPrivacyPolicy')}
            </Text>
          </Link>
        </View>
        
      </SafeAreaView>
    </SignUpWrapper>
  );
};

export default AboutSavvy;
