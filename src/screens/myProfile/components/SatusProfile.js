import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, ImageComponent, Text, DivSpace } from '@components';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import IconWarning from '@utils/iconSVG/IconWarning';
const statusComplete= require('@assets/icons/complete.png');


const StatusProfile = ({ status }) => {
  const complete = status === 'complete';
  const warning = status === 'warning';
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  return (
    <View>
      {complete || warning ?
        <View row>
          {complete ? 
            <ImageComponent
              source={statusComplete  }
              height={verticalScale(12)}
              width={scale(12)}
            />
            : 
            <IconWarning width={scale(13)} height={verticalScale(13)}  fill={brandTheme?.bgOrange01??Colors?.bgOrange01}  fillSecondary={brandTheme?.bgBlue01??Colors?.bgBlue01}/>} 
          
          <DivSpace width-5 />
          <Text h10 medium green>{i18n.t('myProfile.component.textCompleted')}</Text>
        </View>
        :
        null
      }
    </View>
  );
};


export default StatusProfile;
