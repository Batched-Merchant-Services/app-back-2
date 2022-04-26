import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import {
  View,
  Text,
  ImageComponent,
  DivSpace,
  TimeBar,
  ButtonRounded
} from '@components';
import Styles from '@screens/welcome/styles';
import MyProfile from '@assets/welcome/profile.png';

const Profile = ({ percentage = 0 }) => {
  return (
    <View style={Styles.carouselItem} paddingV-24>
      <Text center h17 medium blueDark>
        {i18n.t('welcome.component.myProfile')}
      </Text>
      <DivSpace height-9 />
      <View centerH column>
        <ImageComponent
          source={MyProfile}
          width={scale(197)}
          height={verticalScale(133)}
        />
        <DivSpace height-20 />
        <View centerH width-185 style={{ flexWrap: 'wrap' }}>
          <Text h12 blueDark center>
            <Text h12 blueDark semibold>
              {i18n.t('welcome.component.completeYourProfile1')}{' '}
            </Text>
            {i18n.t('welcome.component.completeYourProfile2')}
          </Text>
        </View>
        <DivSpace height-18 />
        <TimeBar
          width={scale(230)}
          height={verticalScale(7)}
          progress={percentage}
        />
        <DivSpace height-6 />
        <Text h10 semibold blueDark>
          {percentage}% {i18n.t('welcome.component.completed')}
        </Text>
        <DivSpace height-13 />
        <View height-30>
          <ButtonRounded blue>
            <Text h10  semibold>
              {i18n.t('welcome.component.myProfile')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </View>
  );
};

export default Profile;
