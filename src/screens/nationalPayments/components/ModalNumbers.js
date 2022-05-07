import React,{ useState } from 'react';
import { View, Text,DivSpace,ImageComponent,ModalContainer,ResizeImageAvatar,ButtonRounded } from '@components';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CircleAvatar from '@screens/nationalPayments/components/CircleAvatar';
import close from '@assets/icons/close.png';
import i18n from '@utils/i18n';
import Styles from '../styles';
import Colors from '@styles/Colors';
import { useSelector } from 'react-redux';

const ModalNumbers = ({ isOpen, onClose = () => null, navigation,data,onDataSelect,infoData }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [showOpen ] = useState(true);
  let Open = isOpen ? true: false;
  const itemName = infoData.givenName ? infoData.givenName.charAt(0):'';
  const itemLastName  = infoData.familyName ? infoData.familyName.charAt(0):'';
  const handleOnPress=(item)=>{
    onDataSelect(item);
  }; 
  return (
    <ModalContainer showModal={!showOpen? showOpen : Open}>
      <View textBlue01 style={Styles.containerModal} paddingH-15>
        <DivSpace height-10 />
        { data !== [] ?
          data.toString().replace(',','').length <= 0 ?
            <View flex-1 centerH paddingH-5>
              <DivSpace height-30 />
              <View >

                {infoData.thumbnailPath === '' ? (
                  <CircleAvatar size = '75'>
                    <Text h20 bold white>{itemName}{itemLastName}</Text>
                  </CircleAvatar>
                ) : (
                  <ResizeImageAvatar
                    source={{ uri: infoData.thumbnailPath }}
                    width={moderateScale(75)} 
                    height={moderateScale(75)}
                  />
                )}
              </View>
              <DivSpace height-20 />
              <Text white h16 bold>{infoData.givenName}{' '}{infoData.familyName}</Text>
              <DivSpace height-40 />
              <Text white h15 center> {i18n.t('nationalPayments.component.textNoMobilePhones')}</Text>
              <DivSpace height-30 />
              <Text white h10 center>{i18n.t('nationalPayments.component.textVerifyThatTheNumbers')}</Text>
              <View flex-1 bottom>
                <ButtonRounded onPress={onClose}>
                  <Text h10 semibold>
                    {i18n.t('nationalPayments.component.buttonAccept')}
                  </Text>
                </ButtonRounded>
              </View>
              <DivSpace height-80 />
            </View>:
            <View flex-1 paddingH-5>
              <View style={Styles.containerClose} >
                <TouchableOpacity onPress={onClose} style={[Styles.buttonClose,{ backgroundColor: brandTheme?.bgBlue01??Colors.bgBlue01,}]} >
                  <ImageComponent white source={close} width={scale(10)} height={verticalScale(10)} />
                </TouchableOpacity>
              </View>
              <View centerH>
                <DivSpace height-10 />
                <View >
                  {infoData.thumbnailPath === '' ? (
                    <CircleAvatar size = '75'>
                      <Text h20 bold white>{itemName}{itemLastName}</Text>
                    </CircleAvatar>
                  ) : (
                    <ResizeImageAvatar
                      source={{ uri: infoData.thumbnailPath }}
                      width={scale(75)} 
                      height={moderateScale(75)}
                    />
                  )}
                </View>
                <DivSpace height-20 />
                <Text white h16 bold>{infoData.givenName}{' '}{infoData.familyName}</Text>
                <DivSpace height-20 />
                <Text white h15 center>{i18n.t('nationalPayments.component.textSelectTheMain')}</Text>
                <DivSpace height-30 />
                {data.map((item, index) => (
                  item !== null ?
                    <View  key={index} centerV style={{ width:'85%' }} >
                      <TouchableOpacity  style={{ height: verticalScale(40),backgroundColor: brandTheme?.bgBlue06??Colors.bgBlue06,borderColor: brandTheme?.white??Colors.white,borderWidth: 1,borderRadius:30,alignItems:'center',justifyContent:'center'}} onPress={()=>handleOnPress(item)} >
                        <Text h14 center bold>{item}</Text>
                      </TouchableOpacity>
                      <DivSpace height-15 />
                    </View>
                    :null
                ))}
              </View>
            </View>
          : null}
        
      </View>
    </ModalContainer>
  );
};

export default ModalNumbers;
