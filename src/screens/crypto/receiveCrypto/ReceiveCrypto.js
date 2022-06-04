import React,{useState,useEffect} from 'react';
import i18n from '@utils/i18n';
import { ScrollView,Clipboard } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import LocalStorage from '@utils/localStorage';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { useSelector} from 'react-redux';
import { getAddress } from '@utils/api/switch';
import { Bubbles } from 'react-native-loader';
import Colors from '@styles/Colors';
import {
  Text,
  View,
  Link,
  QrCode,
  DivSpace,
  SnackBar,
  ImageComponent,
  NavigationBar,
  ButtonRounded
} from '@components';
import ModalConfirmationCrypto from '../ModalConfirmationCrypto';

const ReceiveCrypto = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [showNameCrypto]=useState(userData?userData.nameCrypto:'');
  const [shortNameCrypto]=useState(userData?userData.typeCrypto:'');
  const [iconCrypto]=useState(userData?userData.iconCrypto:'');
  const [title, setTitle] = useState('');
  const [snakVisible, setSnakVisible] = useState(false);
  const [address,setAddress] = useState('');
  const [actionAnimated, setActionAnimated] = useState(false);
  const [showModal,setShowModal] = useState(true);

  const handleCopy = () => {
    Clipboard.setString(address);
    setSnakVisible(true);
    setTitle(i18n.t('generics.NotificationCopiedText'));
  };
  const handleCloseNotif = () => {
    setSnakVisible(false);
    setActionAnimated(true);
  };

  const handleReturn = () => {
    navigation.goBack();
  };
  useEffect(() => {
    generateAddress();
    
  });

  async function generateAddress() {
    const token = await LocalStorage.get('auth_token');
    const response = await getAddress(token,shortNameCrypto);
    if (response.code < 400) {
      setAddress(response?.data?.address? response?.data?.address: i18n.t('CryptoBalance.component.receiveCrypto.textThereIsNoAddress'));
    } else{
      setAddress(response.message);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  };
  
  console.log('address',address !== ''?true:false);
  return (
    <SignUpWrapper forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('CryptoBalance.component.receiveCrypto.title')}
        onClose={null}
      />
      <DivSpace height-20 />
      <ScrollView>
        <SafeAreaView >
          <View marginH-20>
            <View flex-1 height-160 paddingH-15 centerH centerV textBlue01 style={{ borderRadius: 10}}>
              <ImageComponent source={{uri: iconCrypto}} width={35} height={35} />
              <DivSpace height-10 />
              <Text white h13 center>{i18n.t('CryptoBalance.component.receiveCrypto.textReceiveA')}{' '}{showNameCrypto}{' '}{i18n.t('CryptoBalance.component.receiveCrypto.textPayment')}</Text>
              <DivSpace height-10 />
              <Text white h10 center>{i18n.t('CryptoBalance.component.receiveCrypto.textYouCanGenerateAddress')}</Text>
            </View>
            <DivSpace height-15 />
            <View  centerH centerV style={{ backgroundColor: 'white' }}>
              <QrCode id={address} size={190}/>
            </View>
            <DivSpace height-20 />
            <Text bgGray h10 center>{i18n.t('CryptoBalance.component.receiveCrypto.textYouCanGenerateDescription')}</Text>
            <DivSpace height-20 />
            {address ?
              <View flex-1 paddingH-10 left height-110 bgBlue06 style={{ borderColor: brandTheme?.white??Colors.white,borderWidth: 1,borderRadius: 10}}>
                <Text h11>{i18n.t('CryptoBalance.component.receiveCrypto.textAdress')}</Text>
                <DivSpace height-10 />
                <Text h16>{address}</Text>
                <DivSpace height-10 />
                <View flex-1 bottom>
                  <Link onPress={handleCopy} linkStyle = {{color: brandTheme?.white??Colors.white}}>{i18n.t('CryptoBalance.component.receiveCrypto.buttonTapInTheBox')}</Link>
                  <DivSpace height-10 />
                </View>
                
              </View>
              :
              <View height-30 centerH centerV >
                <Bubbles size={12} color={brandTheme?.bgOrange02??Colors?.bgOrange02}  />
              </View>
            }
            <DivSpace height-10 />
            <Text h10 bgGray regular><Text semibold bgGray> {i18n.t('CryptoBalance.component.receiveCrypto.textConfirmationTimeCan')}{' '}</Text><Text bgGray>{i18n.t('CryptoBalance.component.receiveCrypto.textDependingOnTheSpeed')}{' '}bitcoin{' '}{i18n.t('CryptoBalance.component.receiveCrypto.textBlockchainTakesAndThe')}</Text></Text>
            <DivSpace height-20 />
            <View flex-1 centerH>
              <ButtonRounded
                size= 'sm'
                onPress={handleReturn}
              > 
                <Text h10 bold>
                  {i18n.t('CryptoBalance.component.receiveCrypto.buttonToReturn')}
                </Text>
              </ButtonRounded>
            </View>
          </View>
          <DivSpace height-20 />
        </SafeAreaView>
      </ScrollView>
      <SnackBar
        message={title}
        isVisible={snakVisible}
        onClose={handleCloseNotif}
        animationAction={actionAnimated}
      />
       {showModal&&(
          <ModalConfirmationCrypto visible={showModal}
          onRequestClose={() => { setShowModal(false)}}
          onPressOverlay={handleClose}
          />
        )}
    </SignUpWrapper>
  );
};

export default ReceiveCrypto;
