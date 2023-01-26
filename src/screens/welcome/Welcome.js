import React, { useState } from 'react';

import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale } from 'react-native-size-matters';

import i18n from '@utils/i18n';
import { View, Text, ImageComponent, DivSpace, Checkbox, ButtonBackHome, ModalDisabled } from '@components';
import { useValidatedInput } from '@hooks/validation-hooks';

import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Credits from '@screens/welcome/components/Credits';
import Level from '@screens/welcome/components/Level';
import Profile from '@screens/welcome/components/Profile';
import Notifications from '@screens/welcome/components/Notifications';
import Tips from '@screens/welcome/components/Tips';

import Styles from '@screens/welcome/styles';

import Background from '@assets/imagesBackground/imageBackgroungOn.png';
import Logo from '@assets/welcome/logo.png';

const CAROUSEL_ITEMS = [
    { element: Credits },
    { element: Level },
    { element: Profile },
    { element: Notifications },
    { element: Tips }
];

const Welcome = ({ navigation }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [showModal] = useState(true);

    // TODO: Load real data...
    const user = {
        name: '',
        newOffers: 15,
        level: 12,
        actualPoints: 234,
        remainPoints: 226,
        nextLevel: 13,
        percentage: 65,
        notifications: 6
    };

    const welcome = useValidatedInput(null, false, {
        changeHandlerName: 'onChange'
    });

    function renderItem({ item: { element: Element } }) {
        return <Element {...user} />;
    }
    const handleWelcome = () => {
        navigation.navigate('MyWallet');
    };

    return (
        <SignUpWrapper forceInset={{ top: 0 }}>
            <SafeAreaView style={Styles.wrapper} forceInset={{ top: 'always' }}>
                <DivSpace height-20 />
                <View centerV centerH>
                    <View row>
                        <Text h16 white regular>
                            {i18n.t('welcome.component.hello')}{' '}
                        </Text>
                        <Text h16 white semibold>

                        </Text>
                    </View>
                    <DivSpace height-4 />
                    <View row>
                        <Text h12 white regular>
                            {i18n.t('welcome.component.whatsNew1')}{' '}
                        </Text>
                        <Text h12 white semibold>
                            {i18n.t('welcome.component.whatsNew2')}
                        </Text>
                        <Text h12 white regular>
                            {i18n.t('welcome.component.whatsNew3')}
                        </Text>
                    </View>
                </View>
                <DivSpace height-14 />
                <View centerV>
                    <View>
                        <Carousel
                            loop={false}
                            data={CAROUSEL_ITEMS}
                            renderItem={renderItem}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={scale(284)}
                            inactiveSlideOpacity={1}
                            onSnapToItem={index => setActiveSlide(index)}
                        />
                        <Pagination
                            containerStyle={{
                                paddingHorizontal: 0,
                                paddingVertical: verticalScale(14)
                            }}
                            dotsLength={CAROUSEL_ITEMS.length}
                            activeDotIndex={activeSlide}
                            dotStyle={Styles.dotStyle}
                            inactiveDotStyle={Styles.inactiveDotStyle}
                            inactiveDotOpacity={1}
                            inactiveDotScale={1}
                        />
                    </View>
                </View>
                <DivSpace height-10 />
                <View centerH centerV flex-1>
                    <View centerH centerV bottom>
                        <ButtonBackHome onPress={handleWelcome} />
                    </View>
                    <DivSpace height-20 />
                    <View row centerH centerV>
                        <Text h12 white>{i18n.t('welcome.component.noWelcome')}</Text>
                        <DivSpace width-10 />
                        <Checkbox {...welcome} checkedValue={true} />
                    </View>
                    <DivSpace height-10 />
                </View>
                <ModalDisabled isOpen={showModal} navigation={navigation} />
            </SafeAreaView>
        </SignUpWrapper>
    );
};

export default Welcome;
