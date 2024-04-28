import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import {photo} from '../api/data';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [label, setLabel] = useState('');
  const [speed, setSpeed] = useState('');

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const result = await photo(); // 等待 photo() 完成

      if (typeof result === 'string') {
        const labelMatch = result.match(/[a-zA-Z ]+(?=, [\d.]+ms)/);
        const speedMatch = result.match(
          /Speed: [0-9.]+ms pre-process, [0-9.]+ms inference, [0-9.]+ms NMS per image/,
        );

        if (labelMatch) {
          setLabel(labelMatch[0]);
        }

        if (speedMatch) {
          setSpeed(speedMatch[0]);
        }

        setResultMessage(result);
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
          <Button title="上传图片" onPress={handleUploadImage} />
          <Text>识别结果：{label}</Text>
          <Text>{speed}</Text>
        </>
      )}
    </View>
  );
};

export default App;
