import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity,Clipboard } from 'react-native';

import i18n from '@utils/i18n';
import { View, DivSpace, ImageComponent, Text, BoxGradient,NavigationBar } from '@components';
import { SafeAreaView } from 'react-navigation';
import Styles from './styles';
import BankWallet from '@assets/transfers/bank-wallet.png';
import Copy from '@assets/transfers/copy.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';


const BankTransfer = ({ navigation }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;

  const [clabe] = useState('1234 5678 9012');
  const [reference] = useState('7898');
  const [name] = useState('Savvy');

  function toggleEditableAN() {
    Clipboard.setString(clabe);
  }
  function toggleEditableRN() {
    Clipboard.setString(reference);
  }
  function toggleEditableName() {
    Clipboard.setString(name);
  }

  return (
    <SafeAreaView style={[Styles.containerTrans,{backgroundColor: brandTheme?.bgBlue01??Colors.bgBlue01}]} forceInset={{top: 'always'}}>
      <NavigationBar
        onBack={() => navigation.goBack()}
        body={i18n.t('establecimientosATM.component.title')}
      />
      <View flex-1 centerH centerV>
        <View textBlueDark style={Styles.carouselItem} centerH>
          <DivSpace height-25 />
          <ImageComponent source={BankWallet} width={99} height={40} />
          <DivSpace height-18 />
          <Text h14 white center>
            {i18n.t('transfers.component.bankTransfer')}
          </Text>
          <DivSpace height-27 />
          <View width-234>
            <Text h11 white center>
              {i18n.t('transfers.component.bankTransferDescription1')}{' '}
              <Text semibold white>
                {i18n.t('transfers.component.bankTransferDescription2')}{' '}
              </Text>
              {i18n.t('transfers.component.bankTransferDescription3')}
            </Text>
          </View>
          <DivSpace height-25 />
          <View width-220>
            <View row>
              <View flex-3>
                <Text h10 white>
                  {i18n.t('transfers.component.clabe')}
                </Text>
                <Text h12 white semibold>
                  {clabe}
                </Text>
              </View>
              <View right flex-1>
                <TouchableOpacity onPress={toggleEditableAN}>
                  <BoxGradient size={33} darkblue>
                    <ImageComponent white source={Copy} width={18} height={18} />
                  </BoxGradient>
                </TouchableOpacity>
              </View>
            </View>
            <DivSpace height-12 />
            <View disabled style={{ height: 0.5 }} />
            <DivSpace height-10 />
            <View row>
              <View flex-3>
                <Text h10 white>
                  {i18n.t('transfers.component.reference')}
                </Text>
                <Text h12 white semibold>
                  {reference}
                </Text>
              </View>
              <View right flex-1>
                <TouchableOpacity onPress={toggleEditableRN}>
                  <BoxGradient size={33} darkblue>
                    <ImageComponent white source={Copy} width={18} height={18} />
                  </BoxGradient>
                </TouchableOpacity>
              </View>
            </View>
            <DivSpace height-12 />
            <View disabled style={{ height: 0.5 }} />
            <DivSpace height-10 />
            <View row>
              <View flex-3>
                <Text h10 white>
                  {i18n.t('transfers.component.name')}
                </Text>
                <Text h12 white semibold>
                  {name}
                </Text>
              </View>
              <View right flex-1>
                <TouchableOpacity onPress={toggleEditableName}>
                  <BoxGradient size={33} darkblue>
                    <ImageComponent white source={Copy} width={18} height={18} />
                  </BoxGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <DivSpace height-42 />
          <View width-220>
            <Text h10 white center>
              {i18n.t('transfers.component.verify')}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

BankTransfer.propTypes = {
  clabe: PropTypes.string,
  reference: PropTypes.string,
  name: PropTypes.string
};

export default BankTransfer;
