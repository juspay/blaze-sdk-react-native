# blaze-sdk-react-native

Blaze SDK React Native is a SDK which helps you integrate Breeze 1CCO and its services seamlessly to your React Native app running on Android/iOS.

## React Native SDK Integration

Follow the below steps to integrate Blaze SDK into your React Native application:

### Step 1: Obtaining the Blaze SDK

In your react native project directory, run the following command:

```bash
npm install @juspay/blaze-sdk-react-native
```

### Step 2: Initialize the SDK

#### 2.2.1: Construct the Initiate Payload

Create a Json with correct parameters to initiate the SDK. This is the data that will be used to initialize the SDK.

```javascript
// Create a JSONObject for the Initiate data
const initiatePayload = {
  merchantId: "<MERCHANT_ID>",
  environment: "<ENVIRONMENT>",
  shopUrl: "<SHOP_URL>"
};

// Place Initiate Payload into SDK Payload
const initSDKPayload = {
  requestId: "<UNIQUE_RANDOM_ID>",
  service: "in.breeze.onecco",
  payload: initiatePayload
};

```

Note: Obtain values for `merchantId`, `environment` and `shopUrl` from the Breeze team.

Refer to schemas for understanding what keys mean.

#### 2.2.2: Construct the Callback Method

During the user journey the SDK will call the callback method with the result of the SDK operation.
You need to implement this method in order to handle the result of the SDK operation.

```javascript
function blazeCallbackHandler(event) {
  const eventName = event.payload?.eventName;

  switch (eventName) {
    // Handle various events according to your desired logic
  }
}
```

#### 2.2.3: Call the initiate method on Blaze Instance

Finally, call the initiate method with the payload and the callback method.
The first parameter is the context of the application.

```javascript
// imports
import BlazeSDK from 'blaze-sdk-react-native';

BlazeSDK.initiate(initSDKPayload, blazeCallbackHandler);
```

### Step 3: Start processing your requests

Once the SDK is initiated, you can start processing your requests using the initialized instance of the SDK.
The SDK will call the callback method with the result of the SDK operation.

#### 3.1: Construct the Process Payload

Create a Json payload with the required parameters to process the request.
The process payload differs based on the request.
Refer to schemas sections to understand what kind of data is required for different requests

```kotlin

// 3.1 Create SDK Process Payload
// Create a JSONObject for the Process data
const processPayload = {};
processPayload.action = "<ACTION>";
// and more parameters required as per the action

// Place Process Payload into SDK Payload
const processSDKPayload = {
  requestId: "<UNIQUE_RANDOM_ID>",
  service: "in.breeze.onecco",
  payload: processPayload
};

```

#### 3.2: Call the process method

Call the process method on the Blaze instance with the process payload to start the user journey or a headless flow.

```javascript
BlazeSDK.process(processSDKPayload)
```
