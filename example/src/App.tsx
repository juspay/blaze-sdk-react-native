import {
  Button,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  StatusBar,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BlazeSDK from 'blaze-sdk-react-native';

const containerViewStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 128,
  paddingHorizontal: 16,
  gap: 32,
};

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initiateSDK = () => {
    BlazeSDK.initiate({});
  };

  const processSDK = () => {
    BlazeSDK.process({});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View style={containerViewStyle}>
          <Button title="Initiate" onPress={initiateSDK} />
          <Button title="Process" onPress={processSDK} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
