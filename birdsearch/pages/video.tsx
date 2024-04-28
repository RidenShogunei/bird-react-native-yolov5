import React, {useState} from 'react';
import {
  Button,
  View,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import Video from 'react-native-video';  // 引入Video组件
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [speed, setSpeed] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const result = await RNFetchBlob.fetch('POST', '/video', { 'Content-Type' : 'multipart/form-data' }, formdata);

      if (result) {
        let base64Str = result.data;
        let binary = atob(base64Str.replace(/\s/g, ''));
        let array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        let blob = new Blob([new Uint8Array(array)], {type: 'video/mp4'});
        let url = URL.createObjectURL(blob);
        setVideoUrl(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {videoUrl && (
                 <Video 
                    source={{uri: videoUrl}}
                    style={{width: 300, height: 200}}
                    controls={true}
                    resizeMode={"cover"}
                />
            )}
          <Button title="上传视频" onPress={handleUploadImage} />
        </>
      )}
    </View>
  );
};

export default App;