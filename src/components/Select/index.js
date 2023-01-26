import React, { useEffect, useState } from 'react';
import { TouchableHighlight, AsyncStorage, Platform } from 'react-native';
import ModalDropdown from 'vhuerta-react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import i18n from '@utils/i18n';
import ImageComponent from '@components/ImageComponent';
import Text from '@components/Text';
import View from '@components/View';
import DivSpace from '@components/DivSpace';
import TextInputError from '@components/AnimateLabelInput/TextInputError';
import Option from '@components/Select/Option';
import Styles from '@components/Select/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import UpArrow from '@assets/icons/up-arrow.png';
import UpArrowDisabled from '@assets/icons/up-arrow-disabled.png';

const Select = ({ error, label, value, options, size, onSelect, languages, onFill, dropStyle = {}, dropLabelStyle = {} }) => {
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;

    const [width, setWidth] = useState(null);
    const [isOnTop, setIsOnTop] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [option] = useState({ name: '', value: '' });
    const [styleBackground] = useState(brandTheme.textBlueDark ?? Colors.textBlueDark);
    const [styleBorder] = useState(brandTheme.bgBlue06 ?? Colors.bgBlue06);

    useEffect(() => {
        console.log('error', options)
    }, []);

    const handleSelect = index => {
        onSelect(options[index]);
        if (onFill) {
            onFill(options[index]);
        }

    };

    const handleLanguageChange = index => {
        onSelect(options[index]);
        i18n.changeLanguage(options[index].value);
        AsyncStorage.setItem('lang', options[index].value);
        AsyncStorage.setItem('nameLang', options[index].name);
        onFill(true);
    };

    const handleWillShowHide = () => setIsOpen(!isOpen);

    const handleWrapperLayout = event => {
        const layout = event.nativeEvent.layout;
        setWidth(layout.width);
    };

    const handleAdjustFrame = (style, showInBottom) => {
        style.width = width;
        if (showInBottom) {
            style.height = verticalScale(1 * options.length + 130, 0.40);
            style.left = style.width > 150 ? style.left - verticalScale(1, 0.3) : null;
            style.top = Platform.OS === 'ios' ? style.top = style.top - moderateScale(3, 0.3) : style.top - verticalScale(29);
            setIsOnTop(false);
        } else {
            style.height = verticalScale(1 * options.length + 130, 0.40);
            style.top = Platform.OS === 'ios' ? style.top = style.top - moderateScale(3, 0.3) : style.top + style.height - verticalScale(135);
            setIsOnTop(true);
        }
        return style;
    };

    const dropdownRenderRow = ({ emoji, name, icon, balance, typeMoney, amount }) => {
        onSelect(option);
        return (
            <TouchableHighlight underlayColor='transparent' style={[Styles.option, { left: 10 }]}>
                <Option size={size} emoji={emoji} name={amount ? amount : name} icon={icon ? icon : ''} balance={balance ? balance : ''} typeMoney={typeMoney ? typeMoney : ''} />
            </TouchableHighlight>
        );
    };

    const Arrow = isOpen ? UpArrow : UpArrowDisabled;

    return (
        <View onLayout={handleWrapperLayout}>
            <View marginL-2 marginB-4>
                <Text h12 white style={[dropLabelStyle]}>{label}</Text>
            </View>
            <ModalDropdown
                options={options}
                onSelect={languages ? handleLanguageChange : handleSelect}
                onDropdownWillShow={handleWillShowHide}
                onDropdownWillHide={handleWillShowHide}
                adjustFrame={handleAdjustFrame}
                renderRow={dropdownRenderRow}
                renderSeparator={View}
                style={[
                    Styles.dropDown, dropStyle ? dropStyle : { borderColor: styleBorder },
                    ...(error ? [{ borderColor: brandTheme.red ?? Colors.red }] : []),
                    ...(isOpen ? [Styles.dropdownOpen, { backgroundColor: styleBackground, borderColor: styleBorder }] : [])
                ]}
                dropdownStyle={[Styles.dropdownContainer, { backgroundColor: styleBackground, borderColor: styleBorder }]}
            >
                <Option size={size} {...value} topUp />
                <View style={Styles.arrow}>
                    <ImageComponent tintColor={isOpen ? brandTheme.white ?? Colors.white : brandTheme.bgBlue06 ?? Colors.bgBlue06} source={Arrow} width={14} height={14} />
                </View>
            </ModalDropdown>
            <TextInputError error={error} />
            <DivSpace height-7 />
        </View>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    onFill: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['ll', 'sm', 'md', 'lg'])
};

Select.defaultProps = {
    size: 'md',
    value: {}
};

export default Select;
