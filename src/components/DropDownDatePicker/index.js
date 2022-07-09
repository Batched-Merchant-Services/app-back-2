import React, { useState } from 'react';
import { DropDownDatePickerIOS, Modal, Platform, TouchableOpacity, DropDownDatePickerAndroid, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import PropTypes from 'prop-types';
import { formatDate, addZeros } from '@utils/formatters';
import {
  DivSpace,
  ButtonNext,
  ImageComponent,
  View,
  Text
} from '@components';
import { useSelector} from 'react-redux';
import Colors from '@styles/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const moment = require('moment');

const calendar = require('@assets/icons/calendarIcon.png');

const DropDownDatePicker = ({ buttonStyle = {}, onSelected,  textStyle = {}, placeholder, label }) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const format = placeholder ? placeholder.toString(): '';
  const [chosenDate, setChosenDate] = useState(format === '' ? new Date(): new Date(format));
  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const openAndroidDropDownDatePicker = async () => {
    try {
      var today = new Date();
      const { action, year, month, day } = await DropDownDatePickerAndroid.open({
        date   : new Date(),
        maxDate: today,
        mode   : 'calendar',
      });
      if (action !== DropDownDatePickerAndroid.dismissedAction) {
        const newDate = addZeros(month + 1) +  '/' + addZeros(day) + '/' + year;
        setNewDate(newDate);
        onSelected(newDate);
      }
    } catch ({ code, message }) {
      alert('Cannot open date picker: ' + message);
    }
  };
 
  const setDate = (event, date) => {
    let current_date = moment();
    let date_picker = moment(date);
    let edad = current_date.diff(date_picker._d, 'years');
      setChosenDate(date);
      setNewDate(formatDate(date));
      onSelected(formatDate(date));
  };

  const renderPikerModal = () => {
    setShowModal(!showModal);
  };
  const selectDate = () => {
    setChosenDate(chosenDate);
    setNewDate(formatDate(chosenDate));
    setShowModal(!showModal);
  };


  return (
    <View style={styles.heightContainer}>
      <Text h12 regular bgGray> {label} </Text>
      <DivSpace height-5 />
      <TouchableOpacity underlayColor='transparent' style={[styles.buttonList, buttonStyle,{borderColor: brandTheme?.bgBlue06??Colors?.bgBlue06}]}
        onPress={ Platform.OS === 'ios' ? renderPikerModal : openAndroidDropDownDatePicker}>
        <View style={{ flexDirection: 'row' }}>
          {placeholder === undefined || placeholder === '' ?
            <View style={styles.labelDate}>
              {newDate === '' ? <Text h14 medium textGray style={[styles.textPicker, textStyle]}> {'MM/DD/AAAA'}</Text> : <Text h18 medium textGray style={[styles.textPicker, textStyle]}>{newDate}</Text>}
            </View>
            :
            <View style={styles.placeholderDate}>
              <Text h14 medium textGray style={[styles.textPicker, textStyle]}>{newDate === '' ? placeholder : newDate}</Text>
            </View>
          }
          <View style={styles.iconCalendar}>
            <ImageComponent bgBlue06 source={calendar} width={scale(24)} height={verticalScale(24)}/>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
         <View  style={styles.containerModal}>
          <View  style={styles.modal} >
            <DateTimePicker
              testID="dateTimePicker"
              value={chosenDate}
              textColor={brandTheme?.white ?? Colors.white}
              mode='date'
              display="spinner"
              onChange={setDate}
            />
                <DivSpace height-15 />
                <View centerH>
                  <ButtonNext onPress={selectDate}>Select</ButtonNext>
                </View>
                <DivSpace height-15 />
          </View>
      </View>
      </Modal>
    </View>
  );
};
DropDownDatePicker.propTypes = {
  onSelected: PropTypes.func.isRequired
};
export default DropDownDatePicker;