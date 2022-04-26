import React ,{useRef} from 'react';
import {  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import ElementList from '@screens/store/components/ElementList';
import { useValidatedInput } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import Styles from './styles';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import {
  View,
  DivSpace,
  NavigationBar,
  SwitchControl,
  ImageComponent,
  ButtonFloating
} from '@components';
const iconMap = require('@assets/icons/iconMap.png');

const EntertainmentItems = [
  {
    descount       : '25%',
    expires        : '5 junio 2020',
    typeOfer       : 'Credit',
    level          : 3,
    fifteenPayments: '3',
    balance        : '850',
    description    : 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit, sed do eiusmod. '
  },
  {
    descount       : '15%',
    expires        : '10 agosto 2020',
    typeOfer       : 'Contado',
    level          : 1,
    fifteenPayments: '10',
    balance        : '976',
    description    : 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit, sed do eiusmod. '
  }
];
 
const ShoppingList = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const scrollView = useRef(null);
  const page = navigation.getParam('page');
  const ListMap = page === 'listMap' ? true: false;
  function handleMapPress() {
    navigation.navigate('CloseOffers');
  }

  const onclickSegment = useValidatedInput('segment', false, {
    changeHandlerName: 'onChangeSeg'
  });
  function handleDetails(ofer) {
    navigation.navigate('StoreCashPurchase', { ofer });
  }

  const onFill = code => {
    console.log('value', code);
  };
  const ElementEntertainment = EntertainmentItems.map((ofer) => (
    <View>
      <ElementList 
        {...ofer}
        onPress={() => handleDetails(ofer)}
      />
      <DivSpace height-20/>
    </View>
  ));
  const renderIcon=()=> {
    return(
      <TouchableOpacity style={[Styles.buttonLztn,{backgroundColor: brandTheme?.textBlueDark??Colors.textBlueDark}]} onPress={handleMapPress}>
        <ImageComponent
          title
          source={iconMap}
          height={verticalScale(23)} 
          width={scale(16)}
        />
      </TouchableOpacity>
    );
  };
  const handleGoUpPress = () =>
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <SafeAreaView forceInset={{top: 'always'}}>
        {!ListMap &&(<NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('store.component.categoryTitle')}
          onClose={renderIcon()}
        />)}
        {ListMap &&(
          <NavigationBar
            onBack={() => navigation.goBack()}
            body={'Ofertas \n Liverpool'}
          />)}
        <ScrollView ref={scrollView}>
          <DivSpace height-20/>
          <View flex-1 marginH-20>
            {!ListMap &&(<SwitchControl
              {...onclickSegment}
              selectValue={true}
              entretainments
              onSelected={code => onFill(code)}
            />)}
            <DivSpace height-20/>
            {ElementEntertainment}
          </View>
          <DivSpace height-30/>
        </ScrollView>
        <View centerH style={Styles.viewBtnFloating}>
          <ButtonFloating onPress={handleGoUpPress} />
        </View>
      </SafeAreaView>
    </SignUpWrapper>
  );
};
export default ShoppingList;
