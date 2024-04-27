import React, {useState} from 'react';
import {Button, Image, View, Alert, Linking} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {photo} from '../api/data';

const App = () => {
  const [localImageOptions, setLocalImageOptions] = useState([]);

  const handleUploadImage = () => {
    const options = {
      title: '选择图片', // Set the title of the ImagePicker
      storageOptions: {
        skipBackup: true,
        path: 'images', // Save your photos under "images" directory
      },
    };

    launchImageLibrary(options, response => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
        if (res.error.indexOf('Camera permissions not granted') > -1) {
          alert(('提示信息', 'APP需要使用相机，请打开相机权限允许APP使用'), [
            {
              text: '设置',
              onPress: () => {
                Linking.openURL('app-settings:').catch(err =>
                  console.log('error', err),
                );
              },
            },
            {
              text: '取消',
            },
          ]);
        }
        if (res.error.indexOf('Photo library permissions not granted') > -1) {
          alert('提示信息', 'APP需要使用相册，请打开相册权限允许APP使用', [
            {
              text: '设置',
              onPress: () => {
                Linking.openURL('app-settings:').catch(err =>
                  console.log('error', err),
                );
              },
            },
            {
              text: '取消',
            },
          ]);
        }
      } else {
        let source = {uri: res.uri};
        setLocalImageOptions([...localImageOptions, source]);

        try {
          const serverUri = photo(res.uri);
          console.log('上传成功', serverUri);
        } catch (error) {
          console.log('上传失败: ', error);
        }
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="上传图片" onPress={handleUploadImage} />
      {localImageOptions.map((imageSource, idx) => (
        <Image
          key={idx}
          source={imageSource}
          style={{width: 200, height: 200, marginTop: 20}}
        />
      ))}
    </View>
  );
};

export default App;
