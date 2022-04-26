import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import View from '@components/View';
import Text from '@components/Text';
import ImageComponent from '@components/ImageComponent';
import styles from './styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import Check from '@assets/icons/check.png';
import { scale, verticalScale } from 'react-native-size-matters';


const RawSwitchControl = ({ options = [], onChange, defaultValue }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const [selected, setSelected] = useState(null);
  
  /** Set default value onmount */
  useEffect(() => {
    const def = defaultValue || options[0].value;
    setSelected(def);
    onChange && onChange(def);
  }, [defaultValue]);

  function handlePress(option) {
    setSelected(option.value);
    onChange && onChange(option.value);
  }

  return (
    <View row height-53>
      <View flex-1 centerH bottom row>
        {options.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === options.length - 1;
          const isSelected = selected === option.value;
          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={handlePress.bind(null, option)}
                underlayColor="transparent"
                style={[
                  ...(isFirst ? [styles.colorButtonRadiusL,{ backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark}] : []),
                  ...(isLast ? [styles.colorButtonRadiusR,{ backgroundColor: brandTheme.textBlueDark??Colors?.textBlueDark}] : []),
                  ...(isSelected ? [{backgroundColor: brandTheme.bgGray??Colors.bgGray,}] : [])
                ]}
              >
                {isSelected && <View centerH centerV width-20 height-20 style={[styles.circleGreen,{backgroundColor: brandTheme.green??Colors?.green}]}>
                  <ImageComponent
                    white
                    source={Check}
                    height={verticalScale(7)} width={scale(9)}
                  />
                </View>}
                <Text
                  h12
                  style={isSelected ? [styles.textChangueColor,{ color: brandTheme.textBlue01??Colors?.textBlue01 }] : styles.textColor}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
            
          );
        })}
      </View>
    </View>
  );
};

export default RawSwitchControl;
