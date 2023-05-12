import * as React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import HomeImg from '../assets/home.png';
import {useState, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCom from '../components/ButtonCom';
import {
  BannerAd,
  TestIds,
  useInterstitialAd,
} from '@react-native-admob/admob';

const HomePage = ({navigation}) => {
  const {adLoaded, adDismissed, show} = useInterstitialAd(
    'ca-app-pub-8389654504160551/3446314867',
  );

  useEffect(() => {
    if (adDismissed) {
      handleSubmit();
    }
  }, [adDismissed]);

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const bannerRef = useRef(null);
  const handleSubmit = () => {
    try {
      if (name) {
        AsyncStorage.setItem('any_Key_here', name);
        navigation.navigate('quesTiation');
        // setName('')
      }else{
        setErrorMessage('Nama tidak boleh kosong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className=" justify-center items-center px-5 py-5">
      <Image source={HomeImg} />
      <Text className="text-xl font-bold pt-5">Diagnosa Kesehatan Mental</Text>
      <Text className="text-sm text-center px-5">
        Masukkan nama kamu untuk mengecek kesehatan kamu{' '}
      </Text>
      <TextInput
        className="my-5 shadow appearance-none border-2 border-gray-300 rounded-full w-full py-5 font-medium px-6 text-gray-500 leading-tight "
        placeholder="Masukkan Nama Kamu"
        onChangeText={value => {
          if (value.trim() !== '') {
            setName(value);
            setErrorMessage('');
          } else {
            setName('');
            setErrorMessage('Nama tidak boleh kosong');
          }
        }}
        defaultValue={name}
      />
      {errorMessage !== '' && <Text className="text-red-500">{errorMessage}</Text>}
      <ButtonCom
        name={'Mulai'}
        onPress={() => {
          if (adLoaded) {
            show();
          } else {
            handleSubmit();
          }
        }}
      />
      <View className="my-5 bg-slate-200">
        <BannerAd size={'LARGE_BANNER'} unitId={'ca-app-pub-8389654504160551/9548688780'} />
      </View>
    </View>
  );
};

export default HomePage;
