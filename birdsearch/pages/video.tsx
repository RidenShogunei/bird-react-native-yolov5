import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {video} from '../api/data';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setCompleted, setUncompleted} from '../store/processSlice';
const App = () => {
  const navigation = useNavigation();
  const processCompleted = useSelector(state => state.process.completed);
  const dispatch = useDispatch();
  const [resultMessage, setResultMessage] = useState('');
  const [lables, setLables] = useState({});
  const [show, setShow] = useState(false);
  const goback = () => {
    navigation.navigate('Main');
  };
  const handleUploadImage = async () => {
    try {
      dispatch(setCompleted());
      let result = await video(); // 等待 photo() 完成
      console.log('result type:', typeof result); // 打印 result 的类型
      console.log('result content:', result); // 打印 result 的内容
      result = result.data;
      console.log('result type:', typeof result); // 打印 result 的类型
      console.log('result content:', result); // 打印 result 的内容
      if (typeof result === 'string') {
        setResultMessage(result);
        const gflopsIndex = result.indexOf('GFLOPs');
        result = result.slice(gflopsIndex + 6);
        console.log('data fix', result);
        const dataArray = result.split('\n');
        let newArray = dataArray.slice(1, dataArray.length - 4);
        console.log('dataArray', dataArray);
        console.log('newArray', newArray);
        const mid = analyzeData(newArray);
        console.log('lable fix', mid);
        setLables(mid);
      }
    } catch (err) {
      dispatch(setUncompleted());
      console.error(err);
    } finally {
      dispatch(setUncompleted());
    }
  };
  function analyzeData(data) {
    const info = {
      frames: 0,
      totletimes: 0,
    };

    data.forEach(item => {
      const parts = item.split(' ');

      const labelIndex = 6;
      let endIndex = parts.length;

      for (let i = labelIndex + 1; i < parts.length; i++) {
        if (!isNaN(parseFloat(parts[i]))) {
          endIndex = i;
          break;
        }
      }

      const label = parts.slice(labelIndex, endIndex).join(' ');
      const timeIndex = parts.length - 1;
      const time = parseFloat(parts[timeIndex].slice(0, -2));
      if (info[label]) {
        info[label].count += 1;
        info.totletimes += time;
      } else {
        info[label] = {count: 1};
      }

      info.frames += 1;
    });

    // 处理 totletimes
    info.totletimes = info.totletimes.toFixed(2) / 1000; // 保留两位小数并从毫秒转换为秒

    return info;
  }
  const change = () => {
    setShow(prevShow => !prevShow);
  };
  return (
    <ScrollView>
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
          <View>
            <ActivityIndicator
              size="large"
              color="grey"
              style={{marginTop: 'auto', marginBottom: 'auto'}}
            />
            <Text style={{alignItems: 'center', textAlign: 'center'}}>
              视频处理时间可能较长,请耐心等待
            </Text>
          </View>
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
                  source={require('../assets/视频上传.png')}
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
              <Text>识别结果：</Text>
              <Text>视频总帧数：{lables.frames}</Text>
              <Text>使用总时间：{lables.totletimes}s</Text>
              <Text>简要结果：</Text>
              {Object.entries(lables).map(([bird, data]) => {
                if (
                  data &&
                  typeof data === 'object' &&
                  data.hasOwnProperty('count')
                ) {
                  return (
                    <Text
                      key={
                        bird
                      }>{`出现的鸟类：${bird}，出现总计帧数：${data.count}`}</Text>
                  );
                }
                return null;
              })}
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100, // 设置宽度
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                marginLeft: 10,
              }}
              onPress={change}>
              <Text>详情</Text>
              <Image
                source={require('../assets/unfload.png')}
                style={{marginLeft: 10, width: 20, height: 20}}
              />
            </TouchableOpacity>
            {show ? (
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                }}>
                <Text>详细结果：{resultMessage}</Text>
              </View>
            ) : (
              <View></View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default App;
