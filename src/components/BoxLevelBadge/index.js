import React from 'react';
import PropTypes from 'prop-types';

import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

import View from '@components/View';
import Text from '@components/Text';
import ImageComponent from '@components/ImageComponent';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import uulalaWhite from '@assets/levels/uulalaWhite.png';
import Styles from '@components/BoxLevelBadge/styles';


const BoxLevelBadge = ({level, sm}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <View centerH>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[brandTheme.orange??Colors?.orange, brandTheme.bgOrange02??Colors?.bgOrange02]}
        style={sm? Styles.containerLevelSmall : Styles.containerLevel}
      >
        <View row>
          <View flex-1 centerH>
            <ImageComponent
              white
              source={uulalaWhite}
              width={scale(sm? 11 : 16)}
              height={verticalScale(sm? 11 : 16)}
            />
          </View>
          <View flex-1 centerH>
            <Text white {...(sm? {h10: true} : {h14: true})} semibold>
              {String(level).padStart(2, 0)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

BoxLevelBadge.propTypes = {
  level: PropTypes.number.isRequired,
  sm   : PropTypes.bool
};

export default BoxLevelBadge;
