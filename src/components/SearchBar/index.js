import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import {  View, ImageComponent } from '@components';
import Close from '@assets/icons/close.png';
import styles from './styles';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
const lupa = require('@assets/icons/search.png');


const Search = ({ data, dataBack, onData,label }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;


  const [color, setColor] = useState('transparent');
  const [value, onChangeText] = React.useState('');
  const [showClose, setShowClose] = useState(false);

  function SearchFilterFunction(text) {

    let isNumeric = parseInt(text);

    if (isNaN(isNumeric)) {
      
      const searchString = text.toUpperCase();
      setColor(text ? brandTheme.bgBlue06??Colors?.bgBlue06: 'transparent');
     
      const newData = dataBack.itemsBackUp.filter(function(item) {
        const GiveName= item.givenName === null || item.givenName === 'null' ? '' : item.givenName.toString();
        const FamilyName= item.familyName === null || item.familyName === 'null' ? '' : item.familyName.toString();
        const itemData = GiveName.toUpperCase().includes(searchString) || FamilyName.toUpperCase().includes(searchString);
        return itemData;
      });
      onChangeText(text);
      onData(newData);
    }else{

      onChangeText(text);
      onData(data.items);
    }

  }
 

  return (
    <View style={{ width: '100%' }}>
      <View style={[styles.container,{backgroundColor: color,borderColor: brandTheme.bgBlue06??Colors.bgBlue06}]}>
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
          {showClose ? (
            <ImageComponent white source={Close} width={scale(18)} height={ verticalScale(18)} />
          ) : (
            <ImageComponent bgBlue06 source={lupa} width={scale(20)} height={verticalScale(20)} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Search;
