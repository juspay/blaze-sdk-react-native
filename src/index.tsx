import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

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

let callbackFunction = (_payload: Record<string, unknown>) => {};

const eventEmitter = new NativeEventEmitter(BlazeSdkReactNative);

eventEmitter.addListener('blaze-callback', (data: unknown) => {
  const parsedData = safeParseUnknown(data);
  if (parsedData !== null) {
    callbackFunction(parsedData);
  }
});

export function initiate(
  payload: Record<string, unknown>,
  callbackFn: CallbackFn
) {
  callbackFunction = callbackFn;
  BlazeSdkReactNative.initiate(JSON.stringify(payload));
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

function safeParseUnknown(data: unknown): Record<string, unknown> | null {
  if (typeof data === 'string') {
    return safeParseJSON(data);
  }
  return null;
}

function safeParseJSON(jsonString: string): Record<string, unknown> {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}

export default { initiate, process, handleBackPress, terminate };
