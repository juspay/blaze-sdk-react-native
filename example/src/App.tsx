import {
  Button,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  StatusBar,
  type StyleProp,
  type ViewStyle,
  ToastAndroid,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BlazeSDK from '@juspay/blaze-sdk-react-native';

const containerViewStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 128,
  paddingHorizontal: 16,
  gap: 32,
};

function createSDKPayload(
  payload: Record<string, unknown>
): Record<string, unknown> {
  return {
    requestId: Math.random().toString(36).substring(7),
    service: 'in.breeze.onecco',
    payload,
  };
}

function createInitiatePayload() {
  return {
    merchantId: 'd2cstorebeta',
    environment: 'beta',
    shopUrl: 'https://d2c-store-beta.myshopify.com',
  };
}

function createProcessPayload() {
  return {
    cart: {
      token: 'c1-473243a885065ad7c911dc334255d73e',
      note: '',
      attributes: {
        bundleData: '-',
        discountName: '-',
        variant_ids: '-',
        target_variant_ids: '-',
        discount: '-',
      },
      original_total_price: 100,
      total_price: 100,
      total_discount: 0,
      total_weight: 0.0,
      item_count: 1,
      items: [
        {
          id: 45938457084219,
          properties: {},
          quantity: 1,
          variant_id: 45938457084219,
          key: '45938457084219:7df34184-c212-44dc-8d8e-8954b890646d',
          title: 'Sony PS5 Digital Standalone',
          price: 100,
          original_price: 100,
          discounted_price: 100,
          line_price: 100,
          original_line_price: 100,
          total_discount: 0,
          discounts: [],
          sku: '',
          grams: 0,
          vendor: 'Sony',
          taxable: true,
          product_id: 8561540628795,
          product_has_only_default_variant: true,
          gift_card: false,
          final_price: 100,
          final_line_price: 100,
          url: '/products/sony-ps5-digital-standalone?variant=45938457084219',
          featured_image: {
            aspect_ratio: 1.0,
            alt: 'Sony PS5 Digital Standalone',
            height: 679,
            url: 'https://cdn.shopify.com/s/files/1/0684/1624/1979/files/51wPWj--fAL._SX679.jpg?v=1690641107',
            width: 679,
          },
          image:
            'https://cdn.shopify.com/s/files/1/0684/1624/1979/files/51wPWj--fAL._SX679.jpg?v=1690641107',
          handle: 'sony-ps5-digital-standalone',
          requires_shipping: true,
          product_type: '',
          product_title: 'Sony PS5 Digital Standalone',
          product_description:
            "Maximize your play sessions with near instant load times for installed PS5 games. The custom integration of the PS5 console's systems lets creators pull data from the SSD so quickly that they can design games in ways never before possible. Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections in supported PS5 games. Play your favorite PS5 games on your stunning 4K TV. Enjoy smooth and fluid high frame rate gameplay at up to 120fps for compatible games, with support for 120Hz output on 4K displays. With an HDR TV, supported PS5 games display an unbelievably vibrant and lifelike range of colors. PS5 consoles support 8K Output, so you can play games on your 4320p resolution display. Immerse yourself in soundscapes where it feels as if the sound comes from every direction. Through your headphones or TV speakers your surroundings truly come alive with Tempest 3D AudioTech in supported games. Experience haptic feedback via the DualSense wireless controller in select PS5 titles and feel the effects and impact of your in-game actions through dynamic sensory feedback. Get to grips with immersive adaptive triggers, featuring dynamic resistance levels which simulate the physical impact of in-game activities in select PS5 games.",
          variant_title: null,
          variant_options: ['Default Title'],
          options_with_values: [{ name: 'Title', value: 'Default Title' }],
          line_level_discount_allocations: [],
          line_level_total_discount: 0,
          has_components: false,
        },
      ],
      requires_shipping: true,
      currency: 'INR',
      items_subtotal_price: 100,
      cart_level_discount_applications: [],
    },
    action: 'startCheckout',
  };
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initiateSDK = () => {
    ToastAndroid.show('Initiating SDK', ToastAndroid.SHORT);
    BlazeSDK.initiate(createSDKPayload(createInitiatePayload()), (e) => {
      console.log(e);
    });
  };

  const processSDK = () => {
    ToastAndroid.show('Process SDK', ToastAndroid.SHORT);
    BlazeSDK.process(createSDKPayload(createProcessPayload()));
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
