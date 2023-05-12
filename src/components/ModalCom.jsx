import {Modal, View, Text,Image} from 'react-native';
import React from 'react';
import ButtonCom from '../components/ButtonCom';
const ModalCom = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#594F4FA9',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View className="w-[90%] rounded-lg p-5 bg-white items-center">
            <Image source={props.image} className="mb-2 h-40 w-40"  />
          <Text className="mb-2">{props.info}</Text>
          <ButtonCom name={props.name} onPress={props.onPress} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalCom;
