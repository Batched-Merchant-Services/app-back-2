import React, { useState } from 'react';
import { View } from '@components';
import { Modal } from 'react-native';
import Styles from './styles';

const ModalContainer = ({ children, showModal, style={} }) => {

  return (
    <Modal animationType='slide' transparent={true}  visible={showModal}>
      <View
        style={[Styles.positionModal,style]}
      >
        <View centerH centerV>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
