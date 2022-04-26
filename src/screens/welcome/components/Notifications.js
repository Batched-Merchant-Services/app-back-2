import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import Styles from '@screens/welcome/styles';
import { View, Text, ImageComponent, DivSpace, ButtonRounded } from '@components';
import MyNotifications from '@assets/welcome/notifications.png';

const Notifications = ({ notifications }) => {
  return (
    <View style={Styles.carouselItem} paddingV-20>
      <Text center h17 medium blueDark>
        {i18n.t('welcome.component.notifications')}
      </Text>
      <DivSpace height-12 />
      <View centerH>
        <ImageComponent source={MyNotifications} width={scale(197)} height={verticalScale(133)} />
        <DivSpace height-20 />
        <Text h11 blueDark>
          {i18n.t('welcome.component.notificationsValue1')}
        </Text>
        <DivSpace height-5 />
        <Text h32 blueDark bold>
          {notifications}
        </Text>
        <DivSpace height-5 />
        <Text h11 blueDark>
          {i18n.t('welcome.component.notificationsValue2')}
        </Text>
        <DivSpace height-30 />
        <View height-30>
          <ButtonRounded blue>
            <Text h10  semibold>
              {i18n.t('welcome.component.notifications')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
