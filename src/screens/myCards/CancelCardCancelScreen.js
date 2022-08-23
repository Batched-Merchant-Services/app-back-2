import React from 'react';
import { scale } from 'react-native-size-matters';
import {
  DivSpace,
  NavigationBar,
  View,
  Text,
  ButtonRounded
} from '@components';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Cards from '@screens/myCards/components/Cards';
import i18n from '@utils/i18n';
import IconCancelCard from '@utils/iconSVG/IconCancelCard';
import { useSelector } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';

const CancelCardCancelScreen = ({ navigation }) => {
  const data = navigation.getParam('dataBackup');
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const [showModal2fa, setShowModal2fa] = useState(false);


  function handleCancelPress() {
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: { page: 'cardCancel',data: data },
        next: 'CancelCardConfirmation',
      });
      //navigation.navigate('Pin2faConfirmation',{ page: 'cardCancel',data: data });   
    }
  }

  function handleBackPress() {
    navigation.goBack();
  }

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <SignUpWrapper>
      <NavigationBar
        onBack={handleBackPress}
        body={i18n.t('cardCancel.component.title')}
      />
      <DivSpace height-10 />
      <View
        marginH-20
        paddingV-20
        paddingH-20
        centerH
        textBlueDark
        style={{ borderRadius: 10 }}
      >
        <IconCancelCard width={scale(30)} height={verticalScale(30)}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/>
        <DivSpace height-16 />
        <Text h16 medium white>{i18n.t('cardCancel.component.subtitle')}</Text>
        <DivSpace height-18 />
        <Cards
          {...data}
          available={true}
          width={verticalScale(260)} 
          height={verticalScale(170)}
        />
        <DivSpace height-21 />
        <Text h12 center regular white>
          {i18n.t('cardCancel.component.description')}
        </Text>
        <DivSpace height-21 />
        <Text h10 center regular white>
          {i18n.t('cardCancel.component.remanent1')}
          <Text h10 orange>
            {i18n.t('cardCancel.component.remanent2')}
          </Text>
        </Text>
        <DivSpace height-21 />
        <ButtonRounded style={{height: scale(30), width: scale(182)}} onPress={handleCancelPress}>
          <Text h12>
            {i18n.t('cardCancel.component.cancel')}
          </Text>
        </ButtonRounded>
        <DivSpace height-21 />
        <Text h10 regular center white>
          {i18n.t('cardCancel.component.footer2')}
        </Text>
      </View>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </SignUpWrapper>
  );
};

export default CancelCardCancelScreen;
