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

type CallbackFn = (callback: Record<string, unknown>) => void;

export function initiate(
  payload: Record<string, unknown>,
  callbackFn: CallbackFn
) {
  BlazeSdkReactNative.initiate(JSON.stringify(payload), (e: string) => {
    callbackFn(safeParseJSON(e));
  });
}

export function process(payload: Record<string, unknown>) {
  BlazeSdkReactNative.process(JSON.stringify(payload));
}

export function handleBackPress(): boolean {
  return BlazeSdkReactNative.handleBackPress();
}

export function terminate() {
  BlazeSdkReactNative.terminate();
}

// utils
function safeParseJSON(jsonString: string): Record<string, unknown> {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}

export default { initiate, process, handleBackPress, terminate };
