import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, DivSpace, ImageComponent } from '@components';
import { scale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import i18n from '@utils/i18n';
import styles from './styles';
import Check from '@assets/icons/check.png';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';


const SwitchControl = ({ error, selectValue, onSelected, onChangeSeg, value, title, refSeg, semibold, entretainments,containerStyle = {}, textStyle = {},...props }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [valueMiddle, setValueMiddle] = useState(value);
  const [valueThree, setValueThree] = useState(false);

  function handlePress() {
    onChangeSeg(true);
    setValueMiddle(false);
    setValueThree(false);
    onSelected(1);
  }
  function handlePress2() {
    setValueMiddle(true);
    onChangeSeg(false);
    setValueThree(false);
    onSelected(2);
  }
  function handlePress3() {
    setValueThree(true);
    setValueMiddle(false);
    onChangeSeg(false);
    onSelected(3);
  }

  return (
    <View  row height-40>
      <View flex-1 centerH centerV>
        { value || selectValue === 'F' 
          ? <View centerH centerV width-20 height-20 style={[styles.circleGreen,{  backgroundColor: brandTheme.green??Colors?.green}]}>
            <ImageComponent
              white
              source={Check}
              height={verticalScale(7)} width={scale(9)}
            />
          </View>
          :null
        }
        <TouchableOpacity onPress={handlePress} underlayColor='transparent' {...props}
          style={[
            [styles.colorButtonRadiusL, containerStyle,{ backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark}],
            ...(error ? [{borderColor: brandTheme.red??Colors?.red}] : []),
            ...(value || selectValue === 'F'? [{ backgroundColor: brandTheme.bgGray??Colors?.bgGray}] : [])
          ]} >
          <Text h12 style={[...(value || selectValue === 'F'? [styles.textChangueColor,{ color: brandTheme.textBlue01??Colors?.textBlue01 }] : [{ color: brandTheme.bgGray??Colors?.bgGray}]), textStyle]}>{entretainments ? i18n.t('store.component.buttonCredit') :i18n.t('generics.labelGenderF')} </Text>
        </TouchableOpacity>
      </View>
      <DivSpace width-1 />
      <View flex-1 centerH centerV>
        { valueMiddle || selectValue === 'M'
          ? <View centerH centerV width-20 height-20 style={[styles.circleGreen,{  backgroundColor: brandTheme.green??Colors?.green}]}>
            <ImageComponent
              white
              source={Check}
              height={verticalScale(7)} width={scale(9)}
            />
          </View>
          :          null
        }
        <TouchableOpacity onPress={handlePress2} underlayColor='transparent' {...props}
          style={[
            [styles.colorButtonRadius, containerStyle,{backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark}],
            ...(error ? [{borderColor: brandTheme.red??Colors?.red}] : []),
            ...(valueMiddle || selectValue === 'M' ? [{ backgroundColor: brandTheme.bgGray??Colors?.bgGray}] : [])
          ]} >
          <Text h12 style={[...(valueMiddle || selectValue === 'M' ? [styles.textChangueColor,{ color: brandTheme.textBlue01??Colors?.textBlue01}] : [{ color: brandTheme.bgGray??Colors?.bgGray}]), textStyle]} >{ entretainments ? i18n.t('store.component.buttonCoash'):i18n.t('generics.labelGenderM')}</Text>
        </TouchableOpacity>
      </View>
      <DivSpace width-1 />
      <View flex-1 centerH centerV >
        { valueThree || selectValue === 'O'
          ? <View centerH centerV width-20 height-20 style={[styles.circleGreen,{  backgroundColor: brandTheme.green??Colors?.green}]}>
            <ImageComponent
              white
              source={Check}
              height={verticalScale(7)} width={scale(9)}
            />
          </View>
          :          null
        }
        <TouchableOpacity onPress={handlePress3} underlayColor='transparent' {...props}
          style={[
            [styles.colorButtonRadiusR, containerStyle,{ backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark}],
            ...(error ? [{borderColor: brandTheme.red??Colors?.red}] : []),
            ...(valueThree || selectValue === 'O' ? [{ backgroundColor: brandTheme.bgGray??Colors?.bgGray}] : [])
          ]} >
          <Text h12 style={[...(valueThree || selectValue === 'O' ? [styles.textChangueColor,{ color: brandTheme.textBlue01??Colors?.textBlue01}] : [{ color: brandTheme.bgGray??Colors?.bgGray}]), textStyle]} >{ entretainments ? i18n.t('store.component.buttonAll'):i18n.t('generics.labelGenderO')}</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

SwitchControl.propTypes = {
  onSelected: PropTypes.func.isRequired
};

export default SwitchControl;
