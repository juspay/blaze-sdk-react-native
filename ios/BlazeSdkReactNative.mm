#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BlazeSdkReactNative, NSObject)

RCT_EXTERN_METHOD(initiate:(String)initiatePayload)
RCT_EXTERN_METHOD(process:(String)processPayload)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
