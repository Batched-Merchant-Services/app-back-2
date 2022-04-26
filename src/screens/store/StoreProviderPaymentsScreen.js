import React, {useRef,useEffect,useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView,NavigationEvents } from 'react-navigation';
import {
  NavigationBar,
  DivSpace,
  View,
  ImageComponent,
  Select,
  ButtonFloating,
  ModalVerifyStatus
} from '@components';
import { getListServicesPay,getListServicesCatalog,getFilterPays,verifyToken } from '@utils/api/switch';
import { useValidatedInput } from '@hooks/validation-hooks';
import LocalStorage from '@utils/localStorage';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import ProviderContainer from '@screens/store/components/ProviderContainer';
import SearchStore from '@screens/store/components/SearchStore';
import EmptyState from '@screens/EmptyState';
import i18n from '@utils/i18n';
import Styles from '@screens/store/styles';
import startActive from '@assets/icons/startActive.png';
 
const StoreProviderPaymentsScreen = ({ navigation }) => {
  
  const [ showModal,setShowModal ] = useState(false);
  const [ showData,setShowData ] = useState([]);
  const [ showDataBack,setShowDataBack ] = useState([]);
  const [ showCatalog,setShowCatalog ] = useState([]);

  useEffect(() => {
    getListServices();
    getUserInfo();
  }, []);
 
  async function getUserInfo() {
    const token = await LocalStorage.get('auth_token');
    const verifyResponse = await verifyToken(token);
    if (verifyResponse.code < 400) {
      const kycStatus = verifyResponse.data?verifyResponse.data.user.account.kyc.status:'';
      setShowModal(kycStatus === 5 || kycStatus === '5'? false: true);
    }else{
      setShowModal(true);
    } 
  }



  async function getListServices() {
    const token = await LocalStorage.get('auth_token');
    const response = await getListServicesPay(token);
    const responseCatalog = await getListServicesCatalog(token);
    if (response.code < 400) {
      setShowData(response.data);
      setShowDataBack(response.data);
    } 
    if (responseCatalog.code < 400) {
      setShowCatalog(responseCatalog.data);
    } 
  }

  const filterPays = code => {
    const codeID = code? code.id : code;
    getInfoFilter(codeID);
  };

  async function getInfoFilter(codeID) {
    const token = await LocalStorage.get('auth_token');
    const response = await getFilterPays(token,codeID);
    if (response.code < 400) {
      setShowData(response.data);
    }  
  }

  const scrollView = useRef(null);

  const answer = useValidatedInput('', {name: i18n.t('generics.selectOne')}, {
    changeHandlerSelect: 'onSelect'
  });

  function handleSavePayment() {
    navigation.navigate('ProviderPaymentSaved');
  }

  function handleBackPress() {
    navigation.goBack();
  }

  function handleGoUpPress() {
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  const handlePressNext = () => {
    setShowModal(false);
    navigation.navigate('MyProfile');
  };


  const renderSaveButton = () => (
    <TouchableOpacity style={Styles.saveButton} onPress={handleSavePayment}>
      <ImageComponent orange source={startActive} width={32} height={32} />
    </TouchableOpacity>
  );

  return (
    <SignUpWrapper keyboardAware={false}>
      <NavigationBar
        disableExtraTop
        onBack={handleBackPress}
        onClose={renderSaveButton()}
        body={i18n.t('storeProviderPayments.component.title')}
      />
      <DivSpace height-15 />
      <ScrollView style={Styles.providersScrollView} ref={scrollView}>
        <View paddingH-25>
          <Select
            {...answer}
            label={i18n.t('storeProviderPayments.component.filter')}
            options={showCatalog}
            size="sm"
            onFill={(code)=> filterPays(code)}
          />
          <SearchStore data={{showData}} dataBack={{showDataBack}} onData={dataSearch => setShowData( dataSearch )} label={i18n.t('storeProviderPayments.component.searchProviderName')}/>
        </View>
        <DivSpace height-15 />
        <View row style={Styles.providersContainer}>
          {showData.length > 0 &&(
            showData.map((provider, key) => (
              <ProviderContainer
                index={key}
                key={key}
                navigation={navigation}
                {...provider}
              />
            ))
          )}
        </View>
        {showData.length <= 0 &&(
          <EmptyState navigation={navigation} page/>
        )}
      </ScrollView>
      {showData.length > 0 &&(
        <View centerH style={Styles.providersViewBtnFloating}>
          <ButtonFloating onPress={handleGoUpPress} />
        </View>
      )}
      {showModal &&(
        <ModalVerifyStatus isOpen={true} navigation={navigation} onClose={handlePressNext}/>)}
      <NavigationEvents
        onWillFocus={payload => {
          getListServices(payload);
          getUserInfo(payload);
        }}
      />
    </SignUpWrapper>
  );
};

export default StoreProviderPaymentsScreen;
