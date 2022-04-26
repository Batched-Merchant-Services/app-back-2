import React from 'react';

import { scale, verticalScale } from 'react-native-size-matters';
import { ImageBackground } from 'react-native';

import i18n from '@utils/i18n';
import {
  View,
  Text,
  DivSpace,
  TimeBar,
  ImageComponent,
  ButtonRounded,
} from '@components';

import Styles from '@screens/welcome/styles';
import Arrow from '@assets/icons/arrow.png';
import PorgressOn from '@assets/icons/progress-on.png';
import PorgressOff from '@assets/icons/progress-off.png';
import MyLevel from '@assets/welcome/level.png';

const Level = ({
  level = 0,
  actualPoints = 0,
  remainPoints = 0,
  nextLevel = 0
}) => {
  return (
    <View style={Styles.carouselItem} paddingV-20>
      <Text center h17 medium blueDark>
        {i18n.t('welcome.component.myLevel')}
      </Text>
      <DivSpace height-20 />
      <View centerH>
        <View height-129 width-218>
          <ImageBackground
            source={MyLevel}
            style={{ flex: 1 }}
            resizeMode="contain"
          >
            <View centerV centerH flex-1>
              <Text white bold style={Styles.levelText}>
                {level}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <DivSpace height-16 />
        <View width-230>
          <Text h10 blueDark center>
            {i18n.t('welcome.component.levelDescription')}
          </Text>
          <DivSpace height-20 />
          <TimeBar
            width={scale(230)}
            height={verticalScale(7)}
            progress={60}
          />
          <DivSpace height-10 />
          <View width-230 row>
            <View flex-1 left centerV row>
              <ImageComponent
                source={PorgressOn}
                width={scale(8)}
                height={verticalScale(8)}
              />
              <Text h10 blueDark>
                {' '}
                {actualPoints} {i18n.t('welcome.component.points')}
              </Text>
            </View>
            <View flex-1 centerH centerV>
              <ImageComponent
                bgBlue06
                source={Arrow}
                width={scale(28)}
                height={verticalScale(7)}
              />
            </View>
            <View flex-1 right centerV row>
              <Text h10 blueDark>
                {remainPoints} {i18n.t('welcome.component.points')}{' '}
              </Text>
              <ImageComponent
                source={PorgressOff}
                width={scale(8)}
                height={verticalScale(8)}
              />
            </View>
          </View>
          <View width-230 centerH>
            <Text h10 blueDark center>
              {i18n.t('welcome.component.level')} {nextLevel}
            </Text>
          </View>
          <DivSpace height-18 />
        </View>
        <View height-30>
          <ButtonRounded blue>
            <Text h10 semibold>
              {i18n.t('welcome.component.myLevel')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
    </View>
  );
};

export default Level;
