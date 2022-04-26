import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  ImageComponent,
  Text,
  ButtonRounded,
  AnimateLabelAmount,
  View,
  DivSpace
} from '@components';
import ItemWrapper from '@screens/recharges/components/ItemWrapper';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';

import P2P from '@assets/recharges/p2p.png';

const ItemP2P = ({ openToast, onP2P }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);
  const amount = useValidatedInput('amount', '');
  const isValid = isFormValid(amount);
  function handlePressRequestRecharge() {
    if(retry) {
      onP2P();
    } else {
      setIsLoading(true);
     
      setRetry(false);
      setTimeout(() => {
        openToast(i18n.t('recharges.component.noUsers'));
        setIsLoading(false);
        setRetry(true);
      }, 3e3);
    }
  }

  function renderButtonContent() {
    switch (true) {
    case isLoading:
      return; // TODO loader button
    case retry:
      return (
        <Text h9 semibold white>
          {i18n.t('recharges.component.requestAgain')}
        </Text>
      );
    default:
      return (
        <Text h9 semibold white>
          {i18n.t('recharges.component.request')}
        </Text>
      );
    }
  }

  return (
    <ItemWrapper
      icon={
        <ImageComponent
          source={P2P}
          width={scale(28)}
          height={verticalScale(26)}
        />
      }
    >
      <Text h14 white semibold>
        {i18n.t('recharges.component.p2p')}
      </Text>
      <DivSpace height-10 />
      <View width-163>
        <AnimateLabelAmount
          {...amount}
          label={i18n.t('recharges.component.textAmountToReload') + ':'}
          keyboardType={'default'}
          autoCapitalize={'none'}
          raiseLabel
        />
      </View>
      <DivSpace height-10 />
      <View>
        <ButtonRounded
          onPress={handlePressRequestRecharge}
          disabled={!isValid}
          isLoading={isLoading}
          {...(isLoading ? { darkBlue: true } : {})}
          {...(retry ? { blue: true } : {})}
        >
          {renderButtonContent()}
        </ButtonRounded>
      </View>
    </ItemWrapper>
  );
};

export default ItemP2P;
