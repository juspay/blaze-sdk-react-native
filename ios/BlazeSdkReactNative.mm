#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BlazeSdkReactNative, RCTEventEmitter)

RCT_EXTERN_METHOD(initiate:(NSString *)initiatePayload)
RCT_EXTERN_METHOD(process:(NSString *)processPayload)
RCT_EXTERN_METHOD(handleBackPress:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(terminate)

@end
