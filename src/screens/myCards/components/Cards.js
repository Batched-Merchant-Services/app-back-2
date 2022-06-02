import React, { Fragment } from 'react';
import { ImageBackground } from 'react-native';
import { scale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import { View, Text, DivSpace } from '@components';
import Styles from '../styles';
import cardVirtual from '@assets/brand/cardNumbers.png';
import cardFisica from '@assets/brand/cardFisica.png';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';

const Cards = ({ input, available,height,width, ...item }) => {
  const redux = useSelector(state => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const typeCard = item.type;
  console.log('typeCard',item,typeCard)
  return (
    <View style={{ height, width }}>
      <ImageBackground source={typeCard === 'PHYSICAL' || typeCard === 'EMPTY' ? item?.img_card ? item?.img_card !== "" ? { uri: item?.img_card }:cardFisica : cardFisica : item?.img_card !== "" ? { uri: item?.img_card } : cardVirtual} style={[typeCard === 'VIRTUAL' ? Styles.imageContainer : Styles.imageContainer]} imageStyle={{ borderRadius: typeCard === 'PHYSICAL' ? 12 : 0 }}>
        <View right marginT-40 marginR-8>
          <Text style={Styles.textWhite} h10 bold>
            {' '}
            {typeCard !== 'PHYSICAL'
              ? ''
              : i18n.t('myCards.component.textDebitPhysical')}
          </Text>
        </View>
        <View flex-1 marginT-10 marginH-15>
          {typeCard === 'PHYSICAL'   && (
            <Fragment>
              {input ? (
                <View
                  paddingT-5
                  paddingV-1
                  paddingH-5
                  style={{
                    borderColor: brandTheme?.bgBlue06 ?? Colors?.bgBlue06,
                    width: scale(210),
                    borderWidth: 1,
                    borderRadius: 4,
                    backgroundColor: brandTheme?.bgBlue01 ?? Colors?.bgBlue01
                  }}
                >
                  <Text style={Styles.textWhite} h7>
                    {' '}
                    {i18n.t('myCards.component.textCardNumber')}
                  </Text>
                  <Text style={Styles.textWhite} h16 semibold>
                    {' '}
                    {item.cardNumber}
                  </Text>
                </View>
              ) : (
                <React.Fragment>
                  <Text style={Styles.textWhite} h10>
                    {' '}
                  </Text>
                  <Text style={Styles.textWhite} h16 semibold>
                    {' '}
                    {item.cardNumber}
                  </Text>
                </React.Fragment>
              )}
              <DivSpace height-5 />
              <View row>
                <View column>
                  <Text style={Styles.textWhite} h8>
                    {' '}
                    {i18n.t('myCards.component.textValidUntil')}
                  </Text>
                  <Text style={Styles.textWhite} h12 semibold>
                    {' '}
                    {item.dueDate}
                  </Text>
                </View>
                <DivSpace width-5 />
                <View column>
                  <Text style={Styles.textWhite} h8>
                    {' '}
                    {i18n.t('myCards.component.textCVV')}
                  </Text>
                  <Text style={Styles.textWhite} h12 semibold>
                    {' '}
                    {item.cvv}
                  </Text>
                </View>
              </View>
              <DivSpace height-5 />
              <Text style={Styles.textWhite} h12 numberOfLines={1} ellipsizeMode='tail' semibold>
                {' '}
                {item.name}
              </Text>
            </Fragment>
          )}
          {typeCard === 'VIRTUAL' && (
            <View flex-1 bottom>
              <React.Fragment>
                <Text style={Styles.textWhite} h16 semibold>
                  {' '}
                  {item.cardNumber}
                </Text>
              </React.Fragment>
              <DivSpace height-10 />
              <View row>
                <View column>
                  <Text style={Styles.textWhite} h10>
                    {' '}
                    {i18n.t('myCards.component.textValidUntil')}
                  </Text>
                  <Text style={Styles.textWhite} h14 semibold >
                    {' '}
                    {item.dueDate}
                  </Text>
                </View>
                <DivSpace width-8 />
                <View column>
                  <Text style={Styles.textWhite} h10>
                    {' '}
                    {i18n.t('myCards.component.textCVV')}
                  </Text>
                  <Text style={Styles.textWhite} h14 semibold>
                    {' '}
                    {item.cvv}
                  </Text>
                </View>
              </View>
              <DivSpace height-10 />
            </View>
          )}
          {typeCard === 'EMPTY'   && (
            <Fragment>
              {input ? (
                <View
                  paddingT-5
                  paddingV-1
                  paddingH-5
                  style={{
                    borderColor: brandTheme?.bgBlue06 ?? Colors?.bgBlue06,
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 4,
                    backgroundColor: brandTheme?.bgBlue01 ?? Colors?.bgBlue01
                  }}
                >
                  <Text style={Styles.textWhite} h7>
                    {' '}
                    {i18n.t('myCards.component.textCardNumber')}
                  </Text>
                  <Text style={Styles.textWhite} h16 semibold>
                    {' '}
                    {item.cardNumber}
                  </Text>
                </View>
              ) : (
                <React.Fragment>
                  <Text style={Styles.textWhite} h10>
                    {' '}
                  </Text>
                  <Text style={Styles.textWhite} h16 semibold>
                    {' '}
                    {item.cardNumber}
                  </Text>
                </React.Fragment>
              )}
              <DivSpace height-5 />
              <View row>
                <View column>
                  <Text style={Styles.textWhite} h8>
                    {' '}
                    {i18n.t('myCards.component.textValidUntil')}
                  </Text>
                  <Text style={Styles.textWhite} h12 semibold>
                    {' '}
                    {item.dueDate}
                  </Text>
                </View>
                <DivSpace width-5 />
                <View column>
                  <Text style={Styles.textWhite} h8>
                    {' '}
                    {i18n.t('myCards.component.textCVV')}
                  </Text>
                  <Text style={Styles.textWhite} h12 semibold>
                    {' '}
                    {item.cvv}
                  </Text>
                </View>
              </View>
              <DivSpace height-5 />
              <Text style={Styles.textWhite} h12 numberOfLines={1} ellipsizeMode='tail' semibold>
                {' '}
                {item.name}
              </Text>
            </Fragment>
          )}
        </View>
      </ImageBackground>
    </View>

  );
};

export default Cards;


