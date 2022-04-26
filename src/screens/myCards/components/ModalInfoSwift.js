import React,{useState} from 'react';
import { View, Text,DivSpace,ImageComponent, ButtonRounded,ModalContainer,BoxGradient } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import confVitual from '@assets/brand/active.png';
import Styles from '../styles';
import i18n from '@utils/i18n';
import { useSelector } from 'react-redux';


const ModalInfoSwift= ({ isOpen, onClose = () => null, navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandThemeImages = userData?.Theme?.images;

  const [showOpen,setShowOpen ] = useState(true);
  let Open = isOpen ? true: false;

  function handlePress() {
    navigation.navigate('ConfirmCardVirtual');
    setShowOpen(false);
  }

  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
      <DivSpace height-10 />
      <View textBlue01 style={Styles.containerModal}>
        <DivSpace height-30 />
        <View marginH-30  centerH >
          <Text h15 white bold>{i18n.t('myCards.component.modalInfoSwift.textVirtualCardGenerated')}</Text>
          <DivSpace height-20 />
          <BoxGradient size ={82} >
            <ImageComponent
              source={brandThemeImages?.active?brandThemeImages?.active:confVitual}
              width={verticalScale(60)}
              height={verticalScale(60)}
            />
          </BoxGradient>
          <DivSpace height-20 />
          <Text h12 white center>{i18n.t('myCards.component.modalInfoSwift.textYouWillBe')}<Text bold white>{i18n.t('myCards.component.modalInfoSwift.textCheckTheInformation')}</Text></Text>
          <DivSpace height-20 />
          <Text h12 white center>1.- {i18n.t('myCards.component.modalInfoSwift.textCompleteTheInformation')}</Text>
          <DivSpace height-20 />
          <Text h12 white center>2.- {i18n.t('myCards.component.modalInfoSwift.textThePlace')}<Text bold white>{i18n.t('myCards.component.modalInfoSwift.textUsesCookies')}</Text></Text>
          <Text h12 white center>{i18n.t('myCards.component.modalInfoSwift.textYouMustAccept')}</Text>
          <DivSpace height-20 />
          <Text h12 white center>3.- {i18n.t('myCards.component.modalInfoSwift.textConfirmYour')}<Text bold white>{i18n.t('myCards.component.modalInfoSwift.textEmail')}</Text></Text>
          <DivSpace height-20 />
          <Text h12 orange center bold>4.- {i18n.t('myCards.component.modalInfoSwift.textUseYourCard')}</Text>
          <DivSpace height-35 />
          <View centerH>
            <ButtonRounded style={{ width: scale(160), height: verticalScale(30) }} onPress={handlePress} >
              <Text h12 semibold>
                {i18n.t('myCards.component.modalInfoSwift.buttonUnderstood')}
              </Text>
            </ButtonRounded>
          </View>
          
          
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalInfoSwift;
