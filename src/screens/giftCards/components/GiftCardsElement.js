import React,{ useState, useEffect } from 'react';
import { View, Text, DivSpace, ImageComponent, BoxLevelBadge } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import { TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moneyFormatter } from '@utils/formatters';
import Styles from '../styles';
import uber from '@assets/giftCards/uber.png';
import Colors from '@styles/Colors';

const GiftCardsElement = ({
  provider,
  providerDetail,
  typeGiftCard,
  creditGifts,
  biweeklyPayments,
  available,
  onPress,
  index
}) => {
  const [isCredit] = useState(true);
  const [scaleValue]=useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue : 1,
      duration: 1000,
      delay   : index * 180
    }).start();
  }, [Animated]);

  return (
    <Animated.View style={{ opacity: scaleValue }}>
      <TouchableOpacity onPress={onPress}>
        <View
          white
          marginH-18
          style={Styles.giftElement}
        >
          <View paddingV-14 flex-1 row>
            <View flex-1 row>
              <View flex-1 centerV>
                <View paddingH-15>
                  <Text h16 bgBlue02>
                    {provider}
                  </Text>
                  <DivSpace height-10 />
                  <Text h12 bgBlue02 >
                    <Text semibold white>
                      {creditGifts}{' '}
                    </Text>
                    {providerDetail}
                  </Text>
                </View>
                <DivSpace height-5 />
                <View flex-1 row centerV >
                  <DivSpace height-5 />
                  <View centerV width-106 height-18>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#6990FC','#775EFF']}
                      style={Styles.linearOfertList}
                    >
                      <Text semibold h10 white center>{typeGiftCard}</Text>
                    </LinearGradient>
                  </View>
                  <View centerV  style={{marginLeft:-30}}>
                    {isCredit?<BoxLevelBadge level={'03'} sm />:null}
                  </View>
                </View>
                <DivSpace height-5 />
                {isCredit &&(
                  <View width-160 height-18>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#F7AE51',Colors?.bgOrange02]}
                      style={Styles.benefits}
                    >
                      <Text semibold h10 white center>25% de descuento</Text>
                    </LinearGradient>
                  </View>
                )}
              </View>
              <View centerH style={{ flex: 0.7 }}>
                <View width-93 height-55 centerV centerH style={Styles.containerImageProv}>
                  <ImageComponent
                    source={uber}
                    width={scale(80)}
                    height={verticalScale(30)}
                  />
                </View>
                <DivSpace height-25 />
                <Text h10 textGray >
                  {biweeklyPayments} pagos quincenales
                </Text>
                <DivSpace height-5 />
                <Text h20 medium bgBlue02 >
                  {moneyFormatter(available)}
                </Text>
              </View>
            </View>
          </View>
          
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GiftCardsElement;
``