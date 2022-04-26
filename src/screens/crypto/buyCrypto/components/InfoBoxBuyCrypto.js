import React from 'react';
import {
  Text,
  View,
  DivSpace,
  ImageComponent,
  ContainerCrypto,
} from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { moneyFormatter } from '@utils/formatters';
import rowRight from '@assets/icons/rowRight.png';
import upRowGreen from '@assets/icons/upRowGreen.png';
import Styles from './styles';

const InfoBoxBuyCrypto = ({ 
  navigation,
  icon,
  name,
  balance,
  typeCurrency,
  percent,
  updateTime  
}) => {

  const handlePressMyLevel = () => {
    navigation.navigate('buyCrypto');
  };

  return (
    <ContainerCrypto onPress={handlePressMyLevel}>
      <View row padding-10>
        <View flex-1>
          <View row centerV>
            <View centerH centerV white style={[Styles.containerImage]}>
              <ImageComponent
                source={{uri: icon}}
                width={scale(30)}
                height={verticalScale(30)}
              />
            </View>
            <DivSpace width-5/>
            <Text white h16 semibold>
              {name}
            </Text>
          </View>
          <DivSpace height-10 />
          <Text textGray h14 medium>
            BTC = <Text white>{moneyFormatter(balance)}</Text> {typeCurrency}
          </Text>
        </View>

        <View style={{flex: 0.5}} right>
          <ImageComponent
            white
            source={rowRight}
            width={scale(12)}
            height={verticalScale(12)}
          />
          <DivSpace height-10 />
          <View row centerV>
            <ImageComponent
              green
              source={upRowGreen}
              width={scale(12)}
              height={verticalScale(7)}
            />
            <DivSpace width-5 />
            <Text white h10 medium>
              {percent}
            </Text>
          </View>
          <DivSpace height-10 />
          <Text textGray h10>
            {updateTime}
          </Text>
        </View>
      </View>
    </ContainerCrypto>
  );
};

export default InfoBoxBuyCrypto;
