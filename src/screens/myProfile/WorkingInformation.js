import React ,{useState,useEffect} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-navigation';
import { ImageBackground } from 'react-native';
import i18n from '@utils/i18n';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  BoxBlue,
  ImageComponent,
  Link,
  ButtonNext
} from '@components';

import Styles from './styles';
import circleLevel from '@assets/levels/circleLevel.png';
import uulalaLevel from '@assets/levels/uulalaLevel.png';
import LocalStorage from '@utils/localStorage';
import * as Animatable from 'react-native-animatable';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { updateUserJobInformation } from '@utils/api/switch';
import Colors from '@styles/Colors';


async function getInfoJob(
  setInfoNotAvailable,
  setImageCompany,
  setAddress,
  setJob,
  setDescription,
  setNameCompany,
  setDate
) {
  const token = await LocalStorage.get('auth_token');
  const response = await updateUserJobInformation(token);
  if (response.code < 400) {
    setInfoNotAvailable(true);
    setImageCompany(response.data.company.logo);
    setAddress(response.data.company.address);
    setJob(response.data.working_position);
    setDescription(response.data.company.description);
    setNameCompany(response.data.company.name);
    setDate(response.data.admission_date);
  }
  else {
    setInfoNotAvailable(false);
  }
}

const WorkingInformation = ({ navigation }) => {

  const [infoNotAvailable, setInfoNotAvailable] = useState(null);
  const [imageCompany, setImageCompany ] = useState('');
  const [nameCompany, setNameCompany ] = useState('');
  const [job, setJob ] = useState('');
  const [admissionDate, setDate ] = useState('');
  const [address, setAddress ] = useState('');
  const [description, setDescription ] = useState('');

  
  useEffect(() => {
    getInfoCompany();
  }, []);


  async function getInfoCompany(){

    await getInfoJob(
      setInfoNotAvailable,
      setImageCompany,
      setAddress,
      setJob,
      setDescription,
      setNameCompany,
      setDate
    );
  }
  
  function handleBankInformation() {
    navigation.navigate('BankInformation');
  }
  
  return (
    <SignUpWrapper >
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('myProfile.component.WorkingInformation.titleWorkingInformation')}
      />
      <SafeAreaView forceInset={{top: 'always'}} >
        <DivSpace height-10 />
        <View row centerH>
          <View width-6 height-6 bgGray style={{borderRadius: 6}}></View>
          <DivSpace width-6 />
          <View width-6 height-6 bgGray style={{borderRadius: 6}}></View>
          <DivSpace width-6 />
          <View width-6 height-6 bgGray style={{borderRadius: 6}}></View>
          <DivSpace width-6 />
          <View width-6 height-6 bgOrange02 style={{borderRadius: 6}}></View>
          <DivSpace width-6 />
          <View width-6 height-6 bgGray style={{borderRadius: 6}}></View>
        </View>
        <DivSpace height-20 />
        <View centerH>
          <BoxBlue containerStyle={{ height: verticalScale(425) }}>
            <View centerH marginH-25 >
              <DivSpace height-10 />
              {infoNotAvailable && infoNotAvailable !== null &&(
                <Animatable.View animation="fadeIn"  style={{ alignItems: 'center', justifyContent: 'center'}}>
                  <View
                    width-134
                    height-57
                    centerH centerV
                    style={{ borderRadius: 10,backgrounColor: Colors.white }}
                  >
                    <ImageComponent
                      source={{ uri: imageCompany }}
                      width={90}
                      height={90}
                    />
                  </View>
                  <DivSpace height-20 />
                  <Text h10 textGray>{i18n.t('myProfile.component.WorkingInformation.textCompany')}</Text>
                  <DivSpace height-5 />
                  <Text h12 medium white>{nameCompany}</Text>
                  <DivSpace height-20 />
                  <Text h10 textGray>{i18n.t('myProfile.component.WorkingInformation.textPosition')}</Text>
                  <DivSpace height-5 />
                  <Text h12 medium white>{job}</Text>
                  <DivSpace height-20 />
                  <Text h10 textGray>{i18n.t('myProfile.component.WorkingInformation.textAdmissionDate')}</Text>
                  <DivSpace height-5 />
                  <Text h12 medium white>{admissionDate}</Text>
                  <DivSpace height-20 />
                  <Text h10 textGray>{i18n.t('myProfile.component.WorkingInformation.textDescription')}</Text>
                  <DivSpace height-5 />
                  <Text h12 medium white center>{description}</Text>
                  <DivSpace height-20 />
                  <Text h12  white>{nameCompany}</Text>
                  <DivSpace height-5 />
                  <Text h10 textGray center>{address}</Text>
                </Animatable.View>
              )}
              {!infoNotAvailable && infoNotAvailable !== null &&(
                <Animatable.View animation="fadeIn"  style={{ alignItems: 'center', justifyContent: 'center'}}>
                  <View centerH marginH-25>
                    <Text h14 medium center>{i18n.t('myProfile.component.WorkingInformation.textInformationNotAvailable')}</Text>
                    <DivSpace height-15 />
                    <ImageBackground source={circleLevel} style={Styles.circleLevel} resizeMode="repeat">
                      <ImageComponent source={uulalaLevel} width={scale(46)} height={verticalScale(46)}/>
                    </ImageBackground>
                    <DivSpace height-10 />
                    <Text h10 white center>{i18n.t('myProfile.component.WorkingInformation.textIfYourCompany')}</Text>
                    <DivSpace height-10 />
                    <Text h10 white center>{i18n.t('myProfile.component.WorkingInformation.textKnowTheBenefits')}</Text>
                    <DivSpace height-35 />
                    <View>
                      <Link onPress={() => {}}>
                        <Text h12 medium white>
                          {i18n.t('myProfile.component.WorkingInformation.textUulalaNetwork')}
                        </Text>
                      </Link>  
                    </View>
                    <DivSpace height-35 />
                    <View centerH>
                      <ButtonNext onPress={handleBankInformation}  />
                    </View>
                  </View>
                </Animatable.View>
              )}
            </View>
          </BoxBlue>
          <DivSpace height-20 />
          {infoNotAvailable && infoNotAvailable !== null &&(
            <View marginH-20>
              <Text h10 textGray>{i18n.t('myProfile.component.textTheInformationRequested')}<Text bold white>{' '}{i18n.t('myProfile.component.textItisProtectedWithUs')}</Text></Text>
              <DivSpace height-5/>
              <View left>
                <Link onPress={() => {}}>
                  <Text h13 medium bgBlue06>
                    {i18n.t('myProfile.component.linkNoticeOfPrivacy')}
                  </Text>
                </Link>  
              </View>
              <DivSpace height-5/>
              <View centerH>
                <ButtonNext onPress={handleBankInformation}  />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};
export default WorkingInformation;
