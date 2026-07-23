import { NativeModules, DeviceEventEmitter } from 'react-native';

const mockNativeModule = {
  initiate: jest.fn(),
  process: jest.fn(),
  handleBackPress: jest.fn(),
  terminate: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

NativeModules.BlazeSdkReactNative = mockNativeModule;

// The SDK subscribes to the native event emitter at import time, so it must
// be loaded after the native module mock is installed.
const BlazeSDK: typeof import('../index').default = require('../index').default;

describe('BlazeSDK', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initiate', () => {
    it('forwards the payload to the native module as a JSON string', () => {
      const payload = { requestId: 'abc', service: 'in.breeze.onecco' };

      BlazeSDK.initiate(payload, jest.fn());

      expect(mockNativeModule.initiate).toHaveBeenCalledTimes(1);
      expect(mockNativeModule.initiate).toHaveBeenCalledWith(
        JSON.stringify(payload)
      );
    });

    it('invokes the callback with parsed data on a blaze-callback event', () => {
      const callback = jest.fn();
      BlazeSDK.initiate({}, callback);

      DeviceEventEmitter.emit(
        'blaze-callback',
        JSON.stringify({ event: 'initiate-result', status: 'SUCCESS' })
      );

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        event: 'initiate-result',
        status: 'SUCCESS',
      });
    });

    it('replaces the registered callback on subsequent calls', () => {
      const first = jest.fn();
      const second = jest.fn();
      BlazeSDK.initiate({}, first);
      BlazeSDK.initiate({}, second);

      DeviceEventEmitter.emit('blaze-callback', '{}');

      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledWith({});
    });

    it('invokes the callback with an empty object for malformed JSON', () => {
      const callback = jest.fn();
      BlazeSDK.initiate({}, callback);

      DeviceEventEmitter.emit('blaze-callback', 'not-json{');

      expect(callback).toHaveBeenCalledWith({});
    });

    it('ignores events whose data is not a string', () => {
      const callback = jest.fn();
      BlazeSDK.initiate({}, callback);

      DeviceEventEmitter.emit('blaze-callback', { already: 'parsed' });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('process', () => {
    it('forwards the payload to the native module as a JSON string', () => {
      const payload = { action: 'startCheckout' };

      BlazeSDK.process(payload);

      expect(mockNativeModule.process).toHaveBeenCalledTimes(1);
      expect(mockNativeModule.process).toHaveBeenCalledWith(
        JSON.stringify(payload)
      );
    });
  });

  describe('handleBackPress', () => {
    it('returns the native module result', () => {
      mockNativeModule.handleBackPress.mockReturnValueOnce(true);
      expect(BlazeSDK.handleBackPress()).toBe(true);

      mockNativeModule.handleBackPress.mockReturnValueOnce(false);
      expect(BlazeSDK.handleBackPress()).toBe(false);
    });
  });

  describe('terminate', () => {
    it('calls the native module', () => {
      BlazeSDK.terminate();

      expect(mockNativeModule.terminate).toHaveBeenCalledTimes(1);
    });
  });
});
