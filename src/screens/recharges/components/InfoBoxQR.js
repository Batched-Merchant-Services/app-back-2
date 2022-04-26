import React from 'react';
import i18n from '@utils/i18n';
import { ImageComponent, Text, DivSpace, View, ButtonRounded,Link } from '@components';
import Styles from '../styles';
import StartInactive from '@assets/icons/startInactive.png';


const InfoBoxQR = ({data,onPress,onPressLink}) => {
  
  return ( 
    <View flex-1 centerH>
      <View white height-130 style={Styles.rechargingContainer}>
        <View row centerV centerH paddingH-15 paddingV-16>
          <View bgGray style={Styles.rechargingAvatar} />
          <DivSpace width-11 />
          <View flex-1>
            <Text h14 textBlueDark semibold>
              {data.name}
            </Text>
            <View row>
              <ImageComponent
                bgBlue06
                source={StartInactive}
                width={14}
                height={14}
              />
              <DivSpace width-2 />
              <ImageComponent
                bgBlue06
                source={StartInactive}
                width={14}
                height={14}
              />
              <DivSpace width-2 />
              <ImageComponent
                bgBlue06
                source={StartInactive}
                width={14}
                height={14}
              />
              <DivSpace width-2 />
              <ImageComponent
                bgBlue06
                source={StartInactive}
                width={14}
                height={14}
              />
              <DivSpace width-2 />
              <ImageComponent
                bgBlue06
                source={StartInactive}
                width={14}
                height={14}
              />
            </View>
          </View>
          <View>
            <Text h10 textBlueDark>
              {data.distance}
            </Text>
          </View>
        </View>
        <View marginL-15>
          <Text h14 bgBlue02>
            {i18n.t('recharges.component.textWaitInYourLocation')}
          </Text>
        </View>
        <DivSpace height-5 />
        <View row right paddingH-12 centerV>
          <View flex-1 left>
            <Link onPress={onPressLink}>
              <Text h14 semibold textBlueDark>
                {i18n.t('recharges.component.call')}
              </Text>
            </Link>
          </View>
          <View flex-1 left>
            <ButtonRounded
              onPress={onPress}
            >
              <Text h10 semibold>
                {i18n.t('recharges.component.textScannQR')}
              </Text>
            </ButtonRounded>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfoBoxQR;
