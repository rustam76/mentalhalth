import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, Image} from 'react-native';
import HomeImg from '../assets/home.png';
import MentalImg from '../assets/mental.png';
import aturan from '../utils/aturan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCom from '../components/ButtonCom';
import ModalCom from '../components/ModalCom';
import Loading from '../components/Loading';
import {fetchData} from '../utils/api';
import {BannerAd, TestIds, useInterstitialAd} from '@react-native-admob/admob';

const quesTiation = ({navigation}) => {
  const {adLoaded, adDismissed, show} = useInterstitialAd(
    'ca-app-pub-8389654504160551/3446314867',
  );

  useEffect(() => {
    if (adDismissed) {
      handleModal();
    }
  }, [adDismissed]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [getName, setGetname] = useState();
  const [cekmental, setCekmental] = useState();
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleYes = () => {
    const currentQuestionId = data.data[currentQuestionIndex].id;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionId]: true,
    }));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleNo = () => {
    const currentQuestionId = data.data[currentQuestionIndex].id;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionId]: false,
    }));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const evaluateAturan = () => {
    if (isEvaluated) {
      return;
    }

    let isMentalHalt = false;
    for (let i = 0; i < aturan.length; i++) {
      const rule = aturan[i];
      let prasyaratTerpenuhi = true;

      for (let j = 0; j < rule.prasyarat.length; j++) {
        const faktor = rule.prasyarat[j];
        if (!answers[faktor]) {
          prasyaratTerpenuhi = false;
          break;
        }
      }

      if (prasyaratTerpenuhi) {
        isMentalHalt = true;
        setCekmental(`${getName} Kamu mengalami kondisi ${rule.kesimpulan}`);
        setIsImage(true);
        setModalVisible(true);
        break;
      }
    }

    if (!isMentalHalt) {
      setModalVisible(true);
      setCekmental(`${getName} Kamu tidak mengalami kondisi mental halt`);
    }
    setIsEvaluated(true);
  };

  const handleBack = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsEvaluated(false);
    setIsBack(false);
    navigation.navigate('HomePage');
  };

  const handleModal = () => {
    setModalVisible(false);
    setIsBack(true);
  };

  useEffect(() => {
    if (adDismissed) {
      navigation.navigate('quesTiation');
    }
  }, [adDismissed, navigation]);

  useEffect(() => {
    const getData = async () => {
      let d = await AsyncStorage.getItem('any_Key_here');
      setGetname(d);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDataApi = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getDataApi();
  }, []);

  if (isLoading || data === null) {
    return <Loading />;
  }

  const DataQues = () => {
    return (
      <View>
        <View className="justify-between flex-row items-center">
          <View className="flex-row">
            {currentQuestionIndex < data.data.length ? (
              <Text className="text-lg">
                {currentQuestionIndex + 1}/{data.data.length}
              </Text>
            ) : (
              ''
            )}
          </View>
          <View className="">
            <Text className="text-lg font-medium">{getName}</Text>
          </View>
        </View>
        <View className="items-center">
          <Image source={HomeImg} className="mb-2" />
          {currentQuestionIndex < data.data.length ? (
            <Text className="text-black text-2xl font-medium">
              {data.data[currentQuestionIndex].pertanyaan}
            </Text>
          ) : (
            ''
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="px-5 py-5">
      {currentQuestionIndex < data.data.length ? (
        <View>
          {DataQues()}
          <View className="mt-5">
            <ButtonCom name={'YA'} onPress={handleYes} />
            <ButtonCom name={'TIDAK'} onPress={handleNo} />
          </View>
        </View>
      ) : (
        <View>
          {DataQues()}
          {isBack ? (
            <ButtonCom
              name={'Kembali'}
              onPress={() => { handleBack()}}
            />
          ) : (
            <ButtonCom
              name={'Cek Mental'}
              onPress={() => {
                  evaluateAturan()
              }}
            />
          )}
          <ModalCom
            visible={modalVisible}
            info={cekmental}
            image={isImage ? MentalImg : HomeImg}
            name={'Tes Lagi'}
            onPress={() => {
              if (adLoaded) {
                show();
              } else {
                handleModal()
              }
            }}
  
          />
        </View>
      )}
      <View className="my-5 items-center">
        <BannerAd size={'LARGE_BANNER'} unitId={'ca-app-pub-8389654504160551/9548688780'} />
      </View>
    </View>
  );
};

export default quesTiation;
