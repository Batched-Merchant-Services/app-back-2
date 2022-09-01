import React,{useState} from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  Text,
  ImageComponent,
  DivSpace,
  ButtonRounded,
  Link
} from '@components';
import Styles from '@screens/nationalPayments/styles';
import Modal2faConfirmation from '@screens/auth2fa/Modal2faConfirmation';
import stepThreeCards from '@assets/cards/virtualStepThree.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const InfoVirtualStepThree = ({ navigation }) => {
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const [showModal2fa, setShowModal2fa] = useState(false);

  const handleNext = () =>{
    var foobar = [3, 2, 1];
    if (!foobar.includes(userData?.type2fa)) {
      setShowModal2fa(true);
    } else {
      navigation.navigate('Pin2faConfirmation', {
        data: { page: 'createVirtualCard' },
        next: 'ConfirmationUpdateCard'
      });
      //navigation.navigate('Pin2faConfirmation',{ page: 'createVirtualCard' });   
    }
  }

  const handleClose = () => {
    setShowModal2fa(!showModal2fa);
  };

  return (
    <View textBlueDark style={Styles.carouselItem} paddingV-20>
     <DivSpace height-4 />
     <View marginH-15>
        <Text semibold h16 white center>
          {i18n.t('myCards.component.newVirtualCards.stepThree.title')}
        </Text>
     </View>
      <DivSpace height-25 />
      <View  centerV paddingH-15 height-60 style={{ backgroundColor:Colors?.orange }}>
        <Text h12 semibold>
          {i18n.t('myCards.component.newVirtualCards.stepThree.textSupportTheCardNumbers')}
        </Text>
      </View>
      <DivSpace height-15 />
      <View flex-1 centerH marginH-15>
        <ImageComponent source={stepThreeCards} width={'100%'} height={verticalScale(150)} />
        <DivSpace height-35 />
        <Text h11 white>
          3.{i18n.t('myCards.component.newVirtualCards.stepThree.textPressActivateCard')}
        </Text>
        <Text h11 white>
        {i18n.t('myCards.component.newVirtualCards.stepThree.textYouCanCloseTheVirtual')}
        </Text>
      </View>
      <View flex-1 bottom centerH>
        <ButtonRounded onPress={handleNext} >
          <Text h12 semibold>
          {i18n.t('myCards.component.newVirtualCards.stepThree.buttonActivateCard')}
          </Text>
        </ButtonRounded>
        <DivSpace height-10 />
        <Link >
          <Text h11 medium white>
            {i18n.t('myCards.component.newVirtualCards.stepThree.linkExit')}
          </Text>
        </Link>
      </View>
      <Modal2faConfirmation
        visible={showModal2fa}
        onRequestClose={() => { setShowModal2fa(false) }}
        onPressOverlay={handleClose}
        navigation={navigation}
      />
    </View>
  );
};

export default InfoVirtualStepThree;
