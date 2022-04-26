import React,{useState} from 'react';
import { ModalContainer,DivSpace,Text } from '@components';
import LottieView from 'lottie-react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import i18n from '@utils/i18n';
import Styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
const Loader = ({ navigation,isOpen, onClose = () => null }) => {
  const [showOpen ] = useState(true);
  let Open = isOpen ? true: false;
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <ModalContainer
      showModal={!showOpen? showOpen : Open}
      style={Styles.modalCenter}
    >
    {brandTheme&&(
      <Bars size={24} color={brandTheme.orange??Colors.orange} />
    )}
    {!brandTheme&&(
      <LottieView source={require('@animations/LottieLoader.json')} autoPlay loop style={Styles.sizeLoader} />
    )}
    <DivSpace height-10 />
    <Text h14 semibold>{i18n.t('generics.textLoading')}</Text>
 
      
    </ModalContainer>
  );
};

export default Loader;
