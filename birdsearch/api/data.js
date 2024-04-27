import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

const http = axios.create({
  baseURL: 'https://chenjinxu.top:6003',
  headers: {'Content-Type': 'multipart/form-data'}
});

export function photo() {
  // options for image picker
  const options = {
    title: '选择图片',
  };

  // launch image library
  ImagePicker.launchImageLibrary(options, async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      let formdata = new FormData();
      formdata.append('photo', {
        uri: response.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      try {
        const res = await http.post('/photo', formdata);
        return res.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  });
}

export function video() {
  // options for video picker
  const options = {
    title: 'Choose Video',
    mediaType: 'video',
  };

  // launch video library
  ImagePicker.launchImageLibrary(options, async (response) => {
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