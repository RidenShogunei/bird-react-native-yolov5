import Video from 'react-native-video';
import {View, Button, ActivityIndicator, Keyboard, Text} from 'react-native';
import fs from 'react-native-fs';
import {video} from '../api/data';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  const handleUploadImage = async () => {
    try {
      setLoading(true);
      console.log('start send');
      const Data = await video();
      setVideoUrl(Data)
    } catch (error) {
      console.log('Unable to fetch/send video:', error);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    console.log('video change', videoUrl);
  }, [videoUrl]);

  return (
    <View>
      <Button title="上传视频" onPress={handleUploadImage} />
      {isLoading && <ActivityIndicator size="large" />}
      {videoUrl && (
        <View>
          <Video
            source={{uri: videoUrl}} // 使用videoData作为视频数据源
            controls={true} // 显示控制条
            repeat={true} // 重复播放
          />
          <Text>收到</Text>
        </View>
      )}
    </View>
  );
};

export default App;
