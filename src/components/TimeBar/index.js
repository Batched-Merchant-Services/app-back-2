import React from 'react';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import View from '@components/View';
import Styles from '@components/TimeBar/styles';
import Line from '@assets/icons/line.png';
const TimeBar = ({ height, width, progress }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const heightWithoutborders = height - 2;
  const widthProgress = ((width - 2) * progress) / 100;
  
  return (
    <View centerH style={{ height }}>
      <View
        style={[
          Styles.bar,
          {
            height,
            width,
            borderRadius   : height,
            backgroundColor: brandTheme.textGray??Colors?.textGray,
            borderColor    : brandTheme.white??Colors?.white,
          }
        ]}
      >
        <ImageBackground source={Line} style={Styles.bg} resizeMode="repeat">
          <View
            style={[
              Styles.progress,
              {
                width : widthProgress,
                height: heightWithoutborders
              }
            ]}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[brandTheme.orange??Colors?.orange, brandTheme.bgOrange02??Colors?.bgOrange02]}
              style={[Styles.gradient, { borderRadius: heightWithoutborders }]}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default TimeBar;
