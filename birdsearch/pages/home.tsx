import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8785a2',
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color:'#e4f9f5',
    marginBottom:10,
    fontStyle: 'italic',
    textShadowColor: '#333',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  content: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginLeft:5,
    marginRight:5,
    width:240,
    textAlign:'center',
    height:240,
    alignItems:'center',
    justifyContent:'center'
  },
  card2: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginLeft:5,
    marginRight:5,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  cardText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2b2e4a',
    textAlign:'center'
  },
  intro: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2b2e4a',
    textAlign:'center',
    fontStyle: 'italic',
  },
  search:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  }
});

export default function App() {
  const navigation = useNavigation();
  const gophoto=()=>{
    navigation.navigate('Photo')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>欢迎来到本应用!</Text>
      </View>
      <View style={styles.search}>
      <TouchableOpacity onPress={gophoto} style={[styles.card, { backgroundColor: '#ffc7c7' }]}>
        <Text style={styles.cardText}>拍照搜索</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, { backgroundColor: '#ffe2e2' }]}>
        <Text style={styles.cardText}>视频搜索</Text>
      </TouchableOpacity>
      </View>
      <View style={[styles.card2, { backgroundColor: '#a8e6cf' }]}>
      <View style={styles.content}>
        <Text style={styles.intro}>这是一个鸟类搜索app，你可以通过拍照或视频搜索找到你感兴趣的鸟类信息。在这里，你可以发现新的鸟类，学习他们的习性，进一步增强你的鸟类知识。欢迎使用我们的应用，开启你的鸟类研究之旅！ps:本app的研发需求来自于ZML同学</Text>
      </View>
      </View>
    </SafeAreaView>
  );
}