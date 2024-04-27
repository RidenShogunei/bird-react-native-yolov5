import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [realname, setRealname] = useState('');
  const navigation = useNavigation();
  const handleregister = () => {
    alert(`用户名: ${username}, 密码: ${password}`);
  };
  const goback = () => {
    navigation.navigate('Login'); // 跳转到register页面
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>注册</Text>
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

      <TextInput
        value={realname}
        onChangeText={realname => setRealname(realname)}
        placeholder={'真名'}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleregister}>
          <Text style={styles.buttonText}>注册</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer2} onPress={goback}>
          <Text style={styles.buttonText2}>返回</Text>
        </TouchableOpacity>
      </View>
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
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
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
    width:100,
  },
  buttonContainer2: {
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width:100,
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
