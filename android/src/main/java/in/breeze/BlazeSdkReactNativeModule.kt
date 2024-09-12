package `in`.breeze.blazereactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import `in`.breeze.blaze.Blaze
import org.json.JSONObject

class BlazeSdkReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private lateinit var blaze: Blaze

  override fun getName(): String {
    return NAME
  }

  // Utils

  fun safeParseJson(jsonString: String): JSONObject {
    return try {
      JSONObject(jsonString)
    } catch (e: Exception) {
      JSONObject()
    }
  }

  // Exposed React Methods

  @ReactMethod
  fun initiate(initiatePayload: String) {
    blaze = Blaze()
    var act = getCurrentActivity()
    var initiatePayloadJson = safeParseJson(initiatePayload)
    if (act != null) {
      blaze.initiate(act, initiatePayloadJson) { callbackEvent ->
        run {
          println("callbackEvent: "+callbackEvent.toString(2))
        }
      }
    }
  }

  @ReactMethod
  fun process(processPayload: String) {
    var processPayloadJson = safeParseJson(processPayload)
    blaze.process(processPayloadJson)
  }


  @ReactMethod
  fun handleBackPress(): Boolean  {
    return blaze.handleBackPress()
  }


  @ReactMethod
  fun terminate() {
    blaze.terminate();
  }

  companion object {
    const val NAME = "BlazeSdkReactNative"
  }
}
