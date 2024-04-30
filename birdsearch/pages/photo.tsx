import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {photo} from '../api/data';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { setCompleted,setUncompleted } from '../store/processSlice'
const App = () => {
  const navigation = useNavigation();
  const processCompleted = useSelector(state => state.process.completed);
  const dispatch = useDispatch();
  const [resultMessage, setResultMessage] = useState('');
  const [label, setLabel] = useState('');
  const [speed, setSpeed] = useState('');
  const goback = () => {
    navigation.navigate('Main');
  };
  const handleUploadImage = async () => {
    try {
      dispatch(setCompleted());
      const result = await photo(); // 等待 photo() 完成
      if (typeof result === 'string') {
        const labelMatch = result.match(/[a-zA-Z ]+(?=, [\d.]+ms)/);
        const speedMatch = result.match(
          /Speed: [0-9.]+ms pre-process, [0-9.]+ms inference, [0-9.]+ms NMS per image/,
        );

        if (labelMatch) {
          setLabel(labelMatch[0]);
        }

        if (speedMatch) {
          setSpeed(speedMatch[0]);
        }

        setResultMessage(result);
      }
    } catch (err) {
      dispatch(setUncompleted());
      console.error(err);
    } finally {
      dispatch(setUncompleted());
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'stretch'}}>
      <View style={{alignItems: 'flex-start', marginTop: 10, marginLeft: 10}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', // 阴影颜色
            shadowOffset: {width: 0, height: 2}, // 阴影偏移
            shadowOpacity: 0.25, // 阴影不透明度
            shadowRadius: 3.84, //阴影半径
            borderRadius: 10, // 边角半径
            borderWidth: 1, // 边框宽度
            borderColor: 'black', // 边框颜色
          }}
          onPress={goback}>
          <Image
            source={require('../assets/return.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
      {processCompleted ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
      ) : (
        <>
          <View style={{alignItems: 'center', marginTop: '30%'}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000', // 阴影颜色
                shadowOffset: {width: 0, height: 2}, // 阴影偏移
                shadowOpacity: 0.25, // 阴影不透明度
                shadowRadius: 3.84, //阴影半径
                borderRadius: 10, // 边角半径
                borderWidth: 1, // 边框宽度
                borderColor: 'black', // 边框颜色
              }}
              onPress={handleUploadImage}>
              <Image
                source={require('../assets/upload.png')}
                style={{width: 70, height: 70}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#000',
            }}>
            <Text>识别结果：{label}</Text>
            <Text>所用时间：{speed}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default App;
