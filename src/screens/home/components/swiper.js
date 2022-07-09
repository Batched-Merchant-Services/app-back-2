import React from 'react';
import T from 'prop-types';
import Swiper from 'react-native-swiper';
import { Dimensions } from 'react-native';
import { View, Text, ImageComponent, DivSpace } from '@components';
import { moneyFormatter, thousandsSeparator } from '@utils/formatters';
import { scale, verticalScale } from 'react-native-size-matters';
import rowRight from '@assets/icons/rowRight.png';
import rowBack from '@assets/icons/rowBack.png';
//import cards from '@assets/icons/cards.png';
import { useSelector } from 'react-redux';
import Styles from './styles';
import Colors from '@styles/Colors';
import IconWallet from '@utils/iconSVG/IconWallet';
import IconTransfer from '@utils/iconSVG/IconTransfer';
import IconBitcoin from '@utils/iconSVG/IconBitcoin';


const AccauntsSwiper = ({ balance, initialId, onChangeIndex }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;
  let windowWidth = Dimensions.get('window').width;

  return (
    <View flex-1>
      <Swiper
        index={initialId}
        width={windowWidth}
        showsButtons
        nextButton={<View width-35 height-35 bgOrange02 centerH centerV style={Styles.containerRow}><ImageComponent source={rowRight} width={scale(15)} height={verticalScale(15)} /></View>}
        prevButton={<View width-35 height-35 bgOrange02 centerH centerV style={Styles.containerRow}><ImageComponent source={rowBack} width={scale(15)} height={verticalScale(15)} /></View>}
        buttonWrapperStyle={Styles.swiperButtons}
        showsPagination={true}
        activeDot={<View bgOrange02 style={[Styles.activeDot]} />}
        dot={<View textBlueDark style={[Styles.inactiveDot]} />}
        paginationStyle={Styles.paginationStyle}
        onIndexChanged={(index) => onChangeIndex({ index })}
        loop={false}
      >
        {balance.map((item, index) => (
          <View key={index} style={Styles.slide1}>
            <View centerH>
              {item.type === 4 ?
                <IconBitcoin width={30} height={30} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                : item.type !== 1 ?
                  <IconTransfer width={25} height={25} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
                  : <IconWallet width={25} height={25} fill={brandTheme?.orange ?? Colors?.orange} fillSecondary={brandTheme?.white ?? Colors?.white} />
              }
              <DivSpace height-10 />
              <Text h14 bgOrange02 semibold>{item.name}</Text>
            </View>
            <DivSpace height-20 />
            <View style={{width:'80%'}}>
              {item.type !== 4 && (
                <View row centerV>
                  <View style={{width:'65%'}} right >
                   <Text h32 white medium>{item.type === 5 ? thousandsSeparator(item.balance) : moneyFormatter(item.balance)} </Text>
                  </View>
                  <View flex-1 paddingL-5>
                    {item.type !== 5 &&(
                      <Text h18 bgOrange02 semibold>{item.currency}</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

AccauntsSwiper.propTypes = {
  accounts: T.array,
  onIndexChanged: T.func,
  initialId: T.number,
};

export default AccauntsSwiper;
