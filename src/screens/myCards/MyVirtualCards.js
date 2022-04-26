import React, { useRef, useState,useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { getVirtualCards } from '@utils/api/switch';
import EmptyState from '@screens/EmptyState';

import {
  Text,
  View,
  DivSpace,
  NavigationBar,
  ButtonFloating,
  ImageComponent,
  Loader
} from '@components';
import LocalStorage from '@utils/localStorage';
import rowRight from '@assets/icons/blueRowRight.png';
import i18n from '@utils/i18n';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from './styles';

const ListCards = ({
  created_at,
  redemption_link,
  reference,
  navigation
}) => {
  
  function handlePress() {
    navigation.navigate('ConfirmCardVirtual',{page: 'listVirtualCard',link: redemption_link });
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        textBlueDark
        style={Styles.closed}
        centerV
        marginB-15
        paddingH-9
      >
        <View flex-1 row centerV>
          <Text h10 textGray>{created_at}</Text>
          <DivSpace width-20 />
          <Text h10 white medium>{reference}</Text>
          <DivSpace width-20 />
          <View flex-1 right row centerH centerV>
            <Text h10 title medium>{i18n.t('myCards.component.MyVirtualCardsList.textConsult')}</Text>
            <DivSpace width-10 />
            <ImageComponent white source={rowRight} width={5} height={8} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyVirtualCards = ({ navigation }) => {
  const scrollView = useRef(null);
  const [snakVisible, setSnakVisible] = useState(false);
  const [ showData,setShowData ]=useState(false);
  const [title, setTitle] = useState('');
  const [buttonNext, setButtonNext] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [data, setData]= useState([]);

  useEffect(() => {
    getVirtualCard();
  }, []);

  async function getVirtualCard(){
    const token = await LocalStorage.get('auth_token');
    const responseVirtual = await getVirtualCards(token);
    if (responseVirtual.code < 400) {
      setData(responseVirtual.data);
      setShowData(true);
    } else {
      setSnakVisible(true);
      setButtonNext(true);
      setShowData(false);
      setTitle(responseVirtual.message);
    }
  }



  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  return (
    <SignUpWrapper  forceInset={{top: 'always'}}>
      <SafeAreaView style={Styles.viewInfoCntc}>
        <NavigationBar
          disableExtraTop
          onBack={() => navigation.goBack()}
          body={i18n.t('myCards.component.MyVirtualCardsList.title')}
          onClose={null}
        />
        <DivSpace height-20 />
        {data.length <= 0 && showData && (
          <EmptyState navigation={navigation}/>
        )}
        {data.length > 0 &&(
        <>
        <View marginH-5>
          <Text white h11 regular center>{i18n.t('myCards.component.MyVirtualCardsList.textYour')}{' '}<Text bold white>{i18n.t('myCards.component.MyVirtualCardsList.textYourVirtualCards')}</Text><Text regular>{' '}{i18n.t('myCards.component.MyVirtualCardsList.textYouCanUseThem')}</Text></Text>
        </View>
        <DivSpace height-20 />
        <View row marginH-30>
          <Text textGray h10>{i18n.t('myCards.component.MyVirtualCardsList.textCreation')}</Text>
          <DivSpace width-20 />
          <Text textGray h10>{i18n.t('myCards.component.MyVirtualCardsList.textReference')}</Text>
        </View>
        <DivSpace height-10 />
        <ScrollView ref={scrollView} style={Styles.scroll}>
          {data.map((datum, index) => (
            <ListCards {...datum} key={index} navigation={navigation}/>
          ))}
        </ScrollView>
        </>
        )}
      </SafeAreaView>
      {data.length > 0 &&(
        <>
        <View centerH style={Styles.viewBtnFloating}>
          <ButtonFloating onPress={handleGoUpPress} />
        </View>
        <DivSpace height-20 />
        </>
      )}
      {isLoadingModal &&(
        <Loader 
          isOpen={true}
          navigation={navigation} />)}
    </SignUpWrapper>
  );
};

export default MyVirtualCards;
