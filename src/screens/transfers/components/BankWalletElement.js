import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity,Clipboard } from 'react-native';
import i18n from '@utils/i18n';
import { View, DivSpace, ImageComponent, Text, BoxGradient } from '@components';
import Styles from '@screens/transfers/styles';
import Copy from '@assets/transfers/copy.png';

const BankWalletElement = ({ account, reference, name }) => {
  const accountString = account? account.toString():'';
  const referenceString = reference? reference.toString():'';
  const nameString = name? name.toString():'';
  const copyAccount = ()=> Clipboard.setString(accountString);
  const copyReference = ()=> Clipboard.setString(referenceString);
  const copyName = ()=> Clipboard.setString(nameString);
  return (
    <View flex-1 textBlueDark style={Styles.carouselItem} centerH>
      <DivSpace height-28 />
      <View marginH-20>
        <Text h13 white center>
          <Text semibold white>
            {i18n.t('transfers.component.textTopUpYourUulalaWallet')} {' '}
          </Text>
          <Text white>
            {i18n.t('transfers.component.textWithBankTransfer')}
          </Text>
        </Text>
        <DivSpace height-15 />
        <Text h11 white center>
          {i18n.t('transfers.component.textFromYourOnlineBanking')} {' '}
          <Text semibold white>
            {i18n.t('transfers.component.textMakeATransfer')}{' '}
          </Text>
          {i18n.t('transfers.component.textWithTheFollowingInformation')}
        </Text>
      </View>
      <DivSpace height-25 />
      <View width-240>
        <Text h10 white>
          {i18n.t('transfers.component.textBank')}
        </Text>
        <Text h12 white semibold>
          STP
        </Text>
        <DivSpace height-12 />
        <View disabled style={{ height: 0.5 }} />
        <DivSpace height-10 />
        <View row>
          <View flex-3>
            <Text h10 white>
              {i18n.t('transfers.component.clabe')}
            </Text>
            <Text h12 white semibold>
              {account}
            </Text>
          </View>
          <View right flex-1>
            <TouchableOpacity onPress={copyAccount}>
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
            <TouchableOpacity onPress={copyReference}>
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
            <TouchableOpacity onPress={copyName}>
              <BoxGradient size={33} darkblue>
                <ImageComponent white source={Copy} width={18} height={18} />
              </BoxGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DivSpace height-42 />
      <View width-230>
        <Text h10 white center>
          {i18n.t('transfers.component.verify')}
        </Text>
        <DivSpace height-10/>
        <Text h10 white center>
          {i18n.t('transfers.component.textYourBalanceWillBeReflected')}
        </Text>
      </View>
    </View>
  );
};

BankWalletElement.propTypes = {
  clabe    : PropTypes.string,
  reference: PropTypes.number,
  name     : PropTypes.string
};

export default BankWalletElement;
