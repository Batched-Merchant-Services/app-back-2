import React,{useState} from 'react';
import { View, Text,DivSpace,ImageComponent, ButtonRounded,ModalContainer } from '@components';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import close from '@assets/icons/close.png';
import Styles from '../styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import IconBuy from '../../../utils/iconSVG/IconBuy';
import IconUnic from '../../../utils/iconSVG/IconUnic';
import IconDesintegrate from '../../../utils/iconSVG/IconDesintegrate';
import IconPays from '../../../utils/iconSVG/IconPays';
import IconManyCards from '../../../utils/iconSVG/IconManyCards';
import IconChangeNip from '../../../utils/iconSVG/IconChangeNip';

const ModalSwift= ({ isOpen, onClose = () => null, navigation,page }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  const pageList = page? true : false;
  
  const [showOpen,setShowOpen ] = useState(true);
  let Open = isOpen ? true: false;

  function handlePress() {
    if (!pageList) {
      navigation.navigate('NewVirtualCards');
      onClose();
    } else {
      onClose();
    }
  }

  return (
    <ModalContainer showModal={!showOpen? showOpen : Open} style={{paddingTop: verticalScale(40)}}>
      <DivSpace height-10 />
      <View  style={[Styles.containerModal,{ backgroundColor: brandTheme?.textBlue01??Colors.textBlue01 }]}>
        {!pageList&&(
          <View style={[Styles.containerClose]} >
            <TouchableOpacity onPress={onClose} style={[Styles.buttonClose,{backgroundColor: brandTheme?.bgBlue01??Colors.bgBlue01}]} >
              <ImageComponent white source={close} width={scale(10)} height={verticalScale(10)} />
            </TouchableOpacity>
          </View>
        )}
        {pageList&&(<DivSpace height-10 />)}
        <View marginH-20 >
          <Text h11 orange>{i18n.t('myCards.component.modalswift.textImportant')}</Text>
          <DivSpace height-15 />
          <Text h14 white bold>{i18n.t('myCards.component.modalswift.textBeforeCreating')}</Text>
          <DivSpace height-20 />
          <View>
            <View row >
              <View><IconBuy width={23} height={23}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/></View>
              <DivSpace width-10 />
              <View flex-1><Text h11 white>{i18n.t('myCards.component.modalswift.textVirtualCardsAreUsed')}<Text bold white>{' '}{i18n.t('myCards.component.modalswift.textOnlineOrInAppPayments')}</Text>{' '}{i18n.t('myCards.component.modalswift.textAndRechargeThemWith')}</Text></View>
            </View>
            <DivSpace height-20 />
            <View row centerH>
              <View><IconDesintegrate width={23} height={23}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/></View>
              <DivSpace width-10 />
              <View flex-1 column>
                <Text h11 white bold>{i18n.t('myCards.component.modalswift.textSaveYourCardNumbersWhenCreating')}<Text h11 light white>{' '}{i18n.t('myCards.component.modalswift.textSinceTheyCannotBeRetrieved')}</Text></Text>
              </View>
            </View>
            <DivSpace height-20 />
            <View row centerH>
            <View><IconChangeNip width={23} height={23}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/></View>
              <DivSpace width-10 />
              <View flex-1><Text h11 white>{i18n.t('myCards.component.modalswift.textYouCanCreate')}<Text bold white>{' '}{i18n.t('myCards.component.modalswift.textUnlimitedCards')}</Text>{' '}{i18n.t('myCards.component.modalswift.textButRemember')}<Text bold white>{' '}{i18n.t('myCards.component.modalswift.textTheyWillRemain')}</Text></Text></View>
            </View>
            <DivSpace height-20 />
            {pageList &&(
              <View>
                <View row centerH>
                  <View><IconChangeNip width={23} height={23}  fill={brandTheme?.orange??Colors?.orange} fillSecondary={brandTheme?.white??Colors?.white}/></View>
                  <DivSpace width-10 />
                  <View flex-1><Text h11 white>{i18n.t('myCards.component.modalswift.textIfThereIsAny')}<Text white bold>{' '}{i18n.t('myCards.component.modalswift.textItWillRemainActive')}</Text></Text></View>
                </View>
                <DivSpace height-25 />
              </View>
              
            )}
          </View>
         
          <View centerH>
            <ButtonRounded style={{ width: scale(160), height: verticalScale(30) }} onPress={handlePress} >
              <Text h11 semibold>
                {i18n.t('myCards.component.modalswift.buttonUnderstood')}
              </Text>
            </ButtonRounded>
            <DivSpace height-20 />
            <Text h9 white>{i18n.t('myCards.component.modalswift.textThisInformationIs')}</Text>
            <Text h9 title style={{ textDecorationLine: 'underline'}}>{i18n.t('myCards.component.modalswift.textVirtualCardInst')}</Text>
            <DivSpace height-10 />
          </View>
          
          
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalSwift;
