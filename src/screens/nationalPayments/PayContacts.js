import React, { useState, useEffect } from 'react';
import { SafeAreaView,NavigationEvents } from 'react-navigation';
import {
  FlatList,
  TouchableOpacity,
  ScrollView,  
  Animated,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { View,DivSpace, NavigationBar,ResizeImageAvatar,ImageComponent,Text,ButtonFloating,SearchBar } from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfoPayment} from '@store/ducks/user.ducks';
import ModalNumbers from '@screens/nationalPayments/components/ModalNumbers';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';
import i18n from '@utils/i18n';
import rowRight from '@assets/icons/rowRight.png';
import startSearch from '@assets/icons/startSearch.png';
import showABC from '@assets/icons/showABC.png';
import load from '@assets/icons/load.png';
import startActive from '@assets/icons/startActive.png';
import startDisable from '@assets/icons/startDisable.png';
import Styles from '@screens/nationalPayments/styles';
import Contacts from 'react-native-contacts';
import EmptyState from '@screens/EmptyState';
import Colors from '@styles/Colors';

const PaymentToContacts = ({ navigation }) => {
  const page = navigation.getParam('page');
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [items, setItems] = useState([]);
  const [ showData,setShowData ] = useState([]);
  const [showFav, setShowFav] = useState(true);
  const [dataBackup, setdataBackup] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [itemsBackUp, setItemsBackUp] = useState([]);
  const [listRef] = useState(new Animated.Value(0));
  const [isRechargeQRModal, setIsRechargeQRModal] = useState(false);
  const infoContacts= useSelector(state => state);

  useEffect (() => {
    chargePermission();
  },[]);


  async function chargePermission(){

    if(Platform.OS === 'ios'){
      loadContacts();

    }else if(Platform.OS === 'android'){

      let status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      if (status === 'denied' || status === 'never_ask_again') {
        throw Error('Permissions not granted to access Contacts')
      }else{
        loadContacts();
      }
    }
    Animated.timing(listRef, {
      toValue : 1,
      duration: 2000
    }).start();
  }


  const handleContactFav =()=>{
    setShowFav(!showFav);
    const favContacts = [...infoContacts?.user?.FavPayContacts];
    if (favContacts.length > 0 && showFav) {
      const orderFavs = items.sort(function(a, b){
        const phoneA = a.phone? a.phone.toString(): '';
        const phoneB = b.phone?b.phone.toString():'';
        return phoneA-phoneB;
      });
      const reverseOrder = orderFavs.reverse();  
      setItems([
        ...reverseOrder
      ]);
      setItemsBackUp([
        ...reverseOrder
      ]);
      setShowData([
        ...reverseOrder
      ]);

    } else {
      const orderABC =items.sort((a, b) => a.givenName.localeCompare(b.givenName));
      setShowData([
        ...orderABC
      ]);
      setItems([
        ...orderABC
      ]);
      setItemsBackUp([
        ...orderABC
      ]);
    }
  };
  
  const loadContacts =()=>{
    const ContactFav = [];
    const ContactsComplete = [];
    const favContacts = [...infoContacts?.user?.FavPayContacts];
    Contacts.getAll((err, contacts) => {
      const contactFav = favContacts ? favContacts : [];
      const orderBy =contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
      if(err && err.type === 'permissionDenied'){
        setItems([]);
        setItemsBackUp([]);
        setShowData([]);
      } else {
        if (contactFav.length > 0) {
          contactFav.forEach(element => {
            ContactFav.push(element.recordID);
          });
          const infoFav= orderBy.filter(function(item) {
            return !ContactFav.includes(item.recordID);
          });      
          ContactsComplete.push(...favContacts,...infoFav);
          const contactsOrder =ContactsComplete.sort((a, b) => a.givenName.localeCompare(b.givenName));

          setItems([
            ...contactsOrder
          ]);
          setItemsBackUp([
            ...contactsOrder
          ]);
          setShowData([
            ...contactsOrder
          ]);
        } else {

          setItems([
            ...orderBy
          ]);
          setItemsBackUp([
            ...orderBy
          ]);
          setShowData([
            ...orderBy
          ]);
        }
      }
    });
    
  };

  const handleOncloseModal =() => {
    setIsRechargeQRModal(false);  
  };

  const handleContact = async (item) => { 
    setdataBackup(item);
    const PhoneNumber =  item.phoneNumbers.map((n, index) => {
      const phone = n.number.toString();
      const phoneReplace = phone.replace(/[^a-zA-Z0-9]/g, '');
      if (
        n.label === 'mobile' ||
        n.label === 'movile' ||
        n.label === 'Móvil' ||
        n.label === 'movil'
      ) {
        return phoneReplace;
      }else{
        return null;
      }
    });
    const Phone = PhoneNumber;
    setIsRechargeQRModal(true);
    setPhoneNumbers(Phone);
  };

  const handleNextPage =(item) => {
    dispatch(saveInfoPayment({ imageProfileContact: dataBackup.thumbnailPath, familyNameContact: dataBackup.familyName, givenNameContact: dataBackup.givenName,phoneContact: item  }));
    page === 'requestPayment' ? navigation.navigate('RequestInternationalPayment')
      :       navigation.navigate('ContactInformation',{ page: page, data: dataBackup,phone: item }); 
    setIsRechargeQRModal(false);
    
  };
  
  const renderItem = ({item,index}) => {
    const itemName = item.familyName ? item.familyName.charAt(0):'';
    const itemLastName  = item.givenName ? item.givenName.charAt(0):'';
    return (
      <Animated.View style={{opacity: listRef}}>
        <TouchableOpacity
          onPress={()=> handleContact(item)}
          style={[Styles.buttonListContact,{backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]}
        >
          <View flex-1 row centerH centerV marginH-10>
            <View style={{flex: 0.3 }}>
              {item.thumbnailPath === '' ? (
                <CircleAvatar>
                  <Text h13 bold white>{itemLastName}{itemName}</Text>
                </CircleAvatar>
              ) : (
                <ResizeImageAvatar
                  source={{ uri: item.thumbnailPath }}
                  width={scale(32)} 
                  height={moderateScale(32)}
                />
              )}
            </View>
            <View flex-1 row left>
              <Text white h14>{item.givenName}{' '}{item.familyName}</Text>
            </View>
            <View  right style={{flex: 0.2}}>
              <ImageComponent tintColor={item.phone ? brandTheme?.orange??Colors.orange : brandTheme?.bgBlue01??Colors.bgBlue01}  source={item.phone ? startActive : startDisable} width={scale(20)} height={verticalScale(20)}  />
            </View>
            <View  right style={{flex: 0.11}}>
              <ImageComponent white source={rowRight} width={scale(8)} height={verticalScale(13.7)}  />
            </View>
          </View>
        </TouchableOpacity>
        <DivSpace height-17 />
      </Animated.View>
    );
  };
  return (
   
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView style={Styles.wrapper} forceInset={{top: 'always'}}>
        <NavigationBar disableExtraTop
          onBack={() => navigation.goBack()}
          body={page === 'requestPayment' ? i18n.t('internationalPayments.component.textPaymentRequest') :i18n.t('nationalPayments.component.textPaymentsToContacts')}
          onClose={null}
        />
        <DivSpace height-17 />
        <View centerH row marginH-24 >
          <View flex-5 >
            <SearchBar data={{items}} dataBack={{itemsBackUp}} onData={dataSearch => setItems( dataSearch )} label={i18n.t('nationalPayments.component.labelName')} />
          </View>
          <DivSpace width-10 />
          <View centerH centerV flex-1 >
            <TouchableOpacity onPress={()=>handleContactFav(showFav)} style={{ width: 39,height: 39, borderColor: brandTheme?.textBlueDark??Colors.textBlueDark, borderWidth: 1, backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark, borderRadius: 5 }}>
              <View centerH centerV>
                <ImageComponent
                  white
                  source={showFav ? startSearch:showABC }
                  width={scale(19)}
                  height={verticalScale(19)}
                />
                <DivSpace height-5 />
                <ImageComponent
                  white
                  source={load}
                  width={scale(14)}
                  height={verticalScale(8)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <DivSpace height-25 />
        {showData.length <= 0 &&(
          <EmptyState navigation={navigation}/>
        )}
        {showData.length > 0 &&(
          <ScrollView ref={(ref) => { this.scrollListReftop = ref; }}>
            <View marginH-24>
              <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />  
              <DivSpace height-80 />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      {showData.length > 0 &&(
        <View  centerH style={Styles.viewBtnFloating}>
          <ButtonFloating onPress={() => {this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true});}}/>
        </View>
      )}
      <ModalNumbers 
        isOpen={isRechargeQRModal}
        onClose={handleOncloseModal}
        navigation={navigation}
        data={phoneNumbers}
        infoData={dataBackup}
        onDataSelect={item => handleNextPage(item)} />
      <NavigationEvents
        onWillFocus={payload => {
          chargePermission(payload);
        }}
      />
    </SignUpWrapper>
  );
};

export default PaymentToContacts;
