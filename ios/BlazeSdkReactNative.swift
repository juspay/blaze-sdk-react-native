import BlazeSDK
import Foundation
import React

@objc(BlazeSdkReactNative)
class BlazeSdkReactNative: RCTEventEmitter {

  private var blaze: Blaze?

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["blaze-callback"]
  }


  @objc
  override static func moduleName() -> String! {
    return "BlazeSdkReactNative"
  }

  @objc
  func initiate(_ initiatePayload: String) {
    blaze = Blaze()
    let initiatePayloadJson = safeParseJson(initiatePayload)
    DispatchQueue.main.async {
      if let blaze = self.blaze,
        let rootViewController = UIApplication.shared.delegate?.window??
          .rootViewController
      {
        blaze.initiate(
          context: rootViewController, initiatePayload: initiatePayloadJson
        ) { result in
            if let resultData = try? JSONSerialization.data(withJSONObject: result, options: []),
             let resultString = String(data: resultData, encoding: .utf8) {
              self.sendEvent(withName: "blaze-callback", body: resultString)
            }
        }
      }
    }
  }

  @objc
  func process(_ processPayload: String) {
    let processPayloadJson = safeParseJson(processPayload)
    blaze?.process(payload: processPayloadJson)
  }

  @objc
  func handleBackPress() -> Bool {
    return true
  }

  @objc
  func terminate() {
    blaze?.terminate()
  }

  // Utility method to parse JSON
  func safeParseJson(_ jsonString: String) -> [String: Any] {
    if let data = jsonString.data(using: .utf8) {
      do {
        if let json = try JSONSerialization.jsonObject(with: data, options: [])
          as? [String: Any]
        {
          return json
        }
      } catch {
        print("JSON parsing error: \(error)")
      }
    }
    return [:]
  }
}
