import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  DivSpace,
  BoxBlue,
  ImageComponent,
  Text,
  ButtonRounded,
} from '@components';

import emptySection from '@assets/brand/emptySection.png';
import { useSelector } from 'react-redux';

const EmptyState = ({ navigation, page }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandThemeImages = appData?.Theme?.images;

  function handlePressBack() {
    navigation.goBack();
  }
  return (
    <View centerH marginH-10>
      {!page &&(
        <BoxBlue containerStyle={{ height: verticalScale(510)}}>
          <View flex-1 centerH>
            <DivSpace height-35 />
            <Text h16 center white bold>
              {i18n.t('emptyState.component.textThereIsNoInformation')}
            </Text>
            <DivSpace height-30 />
            <ImageComponent source={brandThemeImages?.emptySection?brandThemeImages?.emptySection:emptySection} width={165} height={165} />
            <DivSpace height-40 />
            <View marginH-16>
              <Text h11 center white>
                {i18n.t('emptyState.component.textUseYour')}{' '}
                <Text semibold white>
                  {i18n.t('emptyState.component.textUulalaApplication')}{' '}
                </Text>
                {i18n.t('emptyState.component.textForYourPurchasesAnd')}
              </Text>
            </View>
            <View flex-1 bottom>
              <ButtonRounded onPress={handlePressBack}>
                <Text h10 semibold>
                  {i18n.t('emptyState.component.buttonBack')}
                </Text>
              </ButtonRounded>
              <DivSpace height-60 />
            </View>
          </View> 
        </BoxBlue>
      )}
      {page&&(
        <BoxBlue containerStyle={{ height: verticalScale(350)}}>
          <View flex-1 centerH>
            <DivSpace height-35 />
            <Text h16 center white bold>
              {i18n.t('emptyState.component.textThereIsNoInformation')}
            </Text>
            <DivSpace height-20 />
            <ImageComponent source={brandThemeImages?.emptySection?brandThemeImages?.emptySection:emptySection} width={165} height={165} />
            <DivSpace height-20 />
            <View marginH-16>
              <Text h11 center white>
                {i18n.t('emptyState.component.textUseYour')}{' '}
                <Text semibold white>
                  {i18n.t('emptyState.component.textUulalaApplication')}{' '}
                </Text>
                {i18n.t('emptyState.component.textForYourPurchasesAnd')}
              </Text>
            </View>
          </View>
        </BoxBlue>
      )}
    </View>
    
  );
};

export default EmptyState;
