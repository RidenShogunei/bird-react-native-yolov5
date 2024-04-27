import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>欢迎来到我们的应用!</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>这是我们的主页，你可以在这里查看应用的各种信息。</Text>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 2,
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#666',
  }
});

export default HomeScreen;