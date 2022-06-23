import React, { Fragment } from 'react';
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
import i18n from '@utils/i18n';

const InfoBoxCrypto = ({ 
  icon,
  name,
  price,
  currency,
  percent,
  updateTime,
  onPress,
  user_price,
  buy
}) => {

  return (
    <Fragment>
      {!buy &&(
        <ContainerCrypto onPress={onPress}>
          <View row padding-10>
            <View flex-1>
              <View centerV row>
                <View centerH centerV white style={Styles.containerImage} >
                  <ImageComponent
                    source={{ uri: icon }}
                    width={scale(30)}
                    height={verticalScale(30)}
                  />
                </View>
                <DivSpace width-5 />
                <Text white h16 semibold>
                  {name}
                </Text>
              </View>
              <DivSpace height-10 />
              <Text white h10 medium>
                1 BTC = {moneyFormatter(price)} {currency}
              </Text>
            </View>

            <View flex-1 right>
              <View row centerV>
                <Text orange h12 medium>
                  {i18n.t('CryptoBalance.component.titleMyBalance')}
                </Text>
                <DivSpace width-5 />
                <ImageComponent
                  white
                  source={rowRight}
                  width={scale(12)}
                  height={verticalScale(12)}
                />
              </View>
              <DivSpace height-10 />
              <Text white h20 semibold>
                0.00012{' '}
                <Text bgGray h20>
                  BTC
                </Text>
              </Text>
              <DivSpace height-10 />
              <View row centerV>
                <ImageComponent
                  white
                  source={upRowGreen}
                  width={scale(12)}
                  height={verticalScale(7)}
                />
                <DivSpace width-5 />
                <Text white h10 medium>
                  {percent}
                </Text>
                <DivSpace width-5 />
                <Text bgGray h10>
                  {updateTime}
                </Text>
              </View>
            </View>
          </View>
        </ContainerCrypto>
      )}
      {buy&&(
        <ContainerCrypto onPress={onPress}>
          <View row padding-10>
            <View flex-1>
              <View flex-1 row centerV>
                <ImageComponent
                  source={{ uri: icon }}
                  width={scale(30)}
                  height={verticalScale(30)}
                />
                <DivSpace width-5 />
                <View>
                  <Text white h16 semibold>
                    {name}
                  </Text>
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
                </View>
              </View>
            </View>
            <View flex-1 right centerV>
              <View row centerV>
                <View>
                  <Text h14 white medium>{moneyFormatter(price)} <Text orange>{currency}</Text></Text>
                  <DivSpace height-2/>
                  <Text h10 bgGray medium>{user_price}<Text orange>{currency}</Text></Text>
                </View>
                <DivSpace width-7/>
                <ImageComponent
                  white
                  source={rowRight}
                  width={scale(12)}
                  height={verticalScale(12)}
                />
              </View>
            </View>
          </View>
        </ContainerCrypto>
      )}
    </Fragment>
    
  );
};

export default InfoBoxCrypto;
