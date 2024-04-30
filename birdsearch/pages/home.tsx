import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // 引入图标库

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef', // 设置整体背景色
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30, // 设置标题字体大小
    fontWeight: '700',
    color: '#2b2e4a',
    textAlign: 'center',
    marginBottom: 20, // 设置标题与介绍部分间隔
  },
  card: {
    backgroundColor: 'white', // 两个操作按钮的背景颜色
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:3
  },
  cardText: {
    fontSize: 18, // 按钮文字大小
    fontWeight: 'bold',
    color: '#2b2e4a',
    textAlign: 'center',
    marginTop: 10, // 将图标和文字分开
  },
  intro: {
    fontSize: 16, // 介绍文字大小
    fontWeight: '400',
    color: '#2b2e4a',
    textAlign: 'center',
    fontStyle: 'italic' // 设置文字为斜体
  },
  introCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  content: {
    flex: 1, // 添加
    justifyContent: 'space-between', // 添加
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default function App() {
  const navigation = useNavigation();
  const gophoto = () => {
    navigation.navigate('Photo');
  };
  const govideo = () => {
    navigation.navigate('Video');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to my app</Text>
        <Image
            source={require('../assets/main.png')}
            style={{width: 300, height: 150}}
        />
        <View style={styles.introCard}>
        <Text style={styles.intro}>
          这是一个鸟类搜索app，你可以通过拍照或视频搜索找到你感兴趣的鸟类信息。在这里，你可以发现新的鸟类，学习他们的习性，进一步增强你的鸟类知识。欢迎使用我们的应用，开启你的鸟类研究之旅！ps1:本app的研发需求来自于ZML同学 ps2:上图是知更鸟
        </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={gophoto} style={styles.card}>
        <Image
            source={require('../assets/相机.png')}
            style={{width: 50, height: 50}}
        />
          <Text style={styles.cardText}>拍照搜索</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={govideo} style={styles.card}>
        <Image
            source={require('../assets/video.png')}
            style={{width: 50, height: 50}}
        />
          <Text style={styles.cardText}>视频搜索</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
