import React,{useState} from 'react';
import { View, Text, NavigationBar,DivSpace,ImageComponent } from '@components';
import { ImageBackground,Platform } from 'react-native';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import { scale, verticalScale } from 'react-native-size-matters';
import rightRow from '@assets/icons/angle-right-orange.png';
import SwipeableElement from '@screens/notifications/components/SwipeableElement';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import Styles from './styles';
import i18n from '@utils/i18n';
import data from './Notifications.data.js';

const imageBackgroungOn = require('@assets/imagesBackground/imageBackgroungOn.png');

const Notifications = ({ navigation }) => {

  const [dataList, setDataList] = useState(data.notifications);

  const renderRow = item => {
    return (
      <RectButton >
        <View paddingH-10 textBlueDark centerV width-330 height-70 style={Styles.borderReactButton}>
          <View row>
            <View flex-1>
              <Text h14 white>{item.typeNotification}</Text>
            </View>
            <View centerH centerV style={{ flex: 0.1 }}>
              <ImageComponent white source={rightRow} width={scale(7)} height={verticalScale(11)}  />
            </View>
          </View>
          <DivSpace height-5/>
          <View row>
            <View flex-1>
              <Text h10 textGray>{item.name}</Text>
            </View>
            <DivSpace width-10/>
            <View>
              <Text h10 textGray>{item.date}</Text>
            </View>
            <DivSpace width-10/>
            <View>
              <Text h10 textGray>{item.time}</Text>
            </View>
          </View>
        </View>
      </RectButton>
    );
  };

  const renderSwipeableRow = (item, index) => {
    return (
      <SwipeableElement
        onSwipeableLeftOpen={() => handleRemove(item.id)}
        onSwipeableRightOpen={() => handleRemove(item.id)}
      >
        {renderRow(item)}
      </SwipeableElement>
    );
  };

  const handleRemove = id => {
    const result = dataList.filter((single,i)=>{
      if( id != i){
        return single;
      }
    });
    setDataList(result);
  };


  return (
    <SignUpWrapper forceInset={{ top: 0 }}>
      <ImageBackground
        source={imageBackgroungOn} style={Styles.imageBackground}
      >
        { Platform.OS === 'ios' ? <DivSpace height-25 />: null }
        <NavigationBar
          onBack={() => navigation.goBack()}
          body={i18n.t('notifications.component.title')}
        />
      </ImageBackground>
      <View style={Styles.containerFlatList}>
        <FlatList
          data={dataList}
          renderItem={({ item, index }) => renderSwipeableRow(item, index)}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>
    </SignUpWrapper>
  );
};

export default Notifications;
