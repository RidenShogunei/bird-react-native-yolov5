import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
const http = axios.create({
  baseURL: 'https://chenjinxu.top:6003',
  headers: { 'Content-Type': 'multipart/form-data' }
});
// 创建一个异步函数去申请权限
async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "应用请求读取相册权限",
        message: "应用需要读取你的相册将图片上传到服务器",
        buttonNeutral: "稍后询问我",
        buttonNegative: "取消",
        buttonPositive: "好的",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("你已获取读取相册权限");
      return true;
    } else {
      console.log("你没有获取读取相册权限");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
export function photo() {
  // 返回一个新的 Promise
  return new Promise((resolve, reject) => {
    // options for image picker
    const options = {
      title: '选择图片',
    };
    // 请求相册权限
    const hasPermission = requestExternalStoragePermission();
    if (!hasPermission) {
      console.log('请先获取读取相册权限');
      return;
    }

    // launch image library
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('User choose image picker', response.assets[0].uri);
        let formdata = new FormData();
        formdata.append('photo', {
          uri: response.assets[0].uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
        try {
          console.log('try to send', formdata);
          const res = await http.post('/photo', formdata);
          console.log('get', res.data);
          resolve(res.data);  // 当获取到 response 后，解决 Promise
        } catch (err) {
          console.error(err);
          reject(err);  // 如果有错误，拒绝 Promise
        }
      }
    });
  });
}


export function video() {
  // options for video picker
  const options = {
    title: 'Choose Video',
    mediaType: 'video',
  };

  // launch video library
  launchImageLibrary(options, async (response) => {
    if (response.didCancel) {
      console.log('User cancelled video picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      let formdata = new FormData();
      formdata.append('video', {
        uri: response.uri,
        type: 'video/mp4',
        name: 'video.mp4',
      });

      try {
        const res = await http.post('/video', formdata);
        return res.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  });
}