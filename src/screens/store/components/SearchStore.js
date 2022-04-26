import React, { useState ,useEffect} from 'react';
import { TextInput } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { DivSpace, View, Text, ImageComponent } from '@components';
import Close from '@assets/icons/close.png';
import i18n from '@utils/i18n';
import styles from '../styles';
import Colors from '@styles/Colors';
import { useSelector} from 'react-redux';
const lupa = require('@assets/icons/search.png');


const SearchStore = ({ data, dataBack, onData,label }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const [color, setColor] = useState('transparent');
  const [value, onChangeText] = React.useState('');
 

  function SearchFilterFunction(text) {
    setColor(text ? brandTheme.bgBlue06??Colors?.bgBlue06: 'transparent');
    const newData = dataBack.showDataBack.filter(function(item) {
      const itemData = item.biller_name ? item.biller_name.toUpperCase() : ''.toUpperCase();
      const textData = text? text.toUpperCase(): '';
      return itemData.indexOf(textData) > -1;
    });
    onChangeText(text);
    onData(newData);
  }

  return (
    <View style={{ width: '100%' }}>
      <View textBlueDark style={[styles.containerSearch, { backgroundColor: color,borderColor: brandTheme.bgBlue06??Colors.bgBlue06 }]}>
        <View  flex-1 centerV>
          <TextInput
            onChangeText={text => SearchFilterFunction(text)}
            value={value}
            placeholder={label}
            placeholderTextColor={brandTheme.white??Colors?.white}
            style={{ height: 42, color: brandTheme.white??Colors?.white, fontSize: 15, paddingLeft: '4%' }}
          />
        </View>
        <View centerV right paddingR-11 style={{ flex: 0.4 }}>
          <ImageComponent bgBlue06 source={lupa} width={scale(20)} height={verticalScale(20)} />
        </View>
      </View>
    </View>
  );
};

export default SearchStore;
