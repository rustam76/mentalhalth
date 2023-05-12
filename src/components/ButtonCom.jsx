import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

const ButtonCom = props => {
  return (
    <TouchableOpacity
      className="w-full rounded-full bg-[#47B5AC] py-5 mt-2"
      onPress={props.onPress}>
      <Text className="text-center text-white text-lg">{props.name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCom;
