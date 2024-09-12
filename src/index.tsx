import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'blaze-sdk-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BlazeSdkReactNative = NativeModules.BlazeSdkReactNative
  ? NativeModules.BlazeSdkReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function initiate(payload: Record<string, unknown>) {
  BlazeSdkReactNative.initiate(JSON.stringify(payload));
}

export function process(payload: Record<string, unknown>) {
  BlazeSdkReactNative.process(JSON.stringify(payload));
}

export default { initiate, process };
