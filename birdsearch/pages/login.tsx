import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {login} from '../api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUID = async () => {
      const uid = await getData();
      if (uid) {
        navigation.navigate('Main');
      }
    }
    console.log('页面已加载');
    fetchUID(); // 调用这个异步函数

    return () => {
      console.log('清理');
      // 在这里进行任何需要的清理操作，
      // 这个函数会在组件卸载时执行，
      // 类似于 class 组件的 componentWillUnmount 生命周期方法。
    };
  }, []);
  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      console.log(result.uid);
      storeData(result.uid)
      navigation.navigate('Main');
    } catch (err) {
      console.log(err);
    }
  };
  const goregister = () => {
    navigation.navigate('Register'); // 跳转到register页面
  };
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // 保存出错
    }
  };

  // 读取数据
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      <TextInput
        value={username}
        onChangeText={username => setUsername(username)}
        placeholder={'用户名'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={password => setPassword(password)}
        placeholder={'密码'}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2} onPress={goregister}>
        <Text style={styles.buttonText2}>注册</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 100,
  },
  buttonContainer2: {
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  title: {
    margin: 5,
    fontFamily: 'Cochin', // 这个是一种常用的斜体字体。注意: 这个字体可能在某些Android设备上可能不会显示为斜体。
    fontStyle: 'italic', // 设为斜体。
    fontSize: 50, // 加大字体。
    color: 'black', // 颜色，你可以自己选择你想要的颜色。
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // 给文字添加阴影效果，你可以自定义颜色和透明度。
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
});

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
