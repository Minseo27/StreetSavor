# Street Savor
## Contributors:
- Daniel Perez Alfaro
- Ying Jie Mei
- Josuel Corporan Vargas
- Minseo Cho

## Table of Contents
1. [Overview](#Overview)
1. [System Design](#SystemDesign)
1. [Technologies and Packages](#Technologies)
1. [Get Started](#Start)
2. [UIs](#UIs)

## Overview
### Description
The cross-platform mobile application Street Savors is a reliable intermediary between vendors and customers, providing insight into the location of mobile consumer trucks. Its focus is on establishing direct and instantaneous navigation functionality more often for consumers of an urban metropolitan area.
### User Stories
1. Consumer Side:
   The ideal consumer is one who enjoys the quick-paced and immersive city lifestyle without the added caveat of expensive indoor dining. This software also tailors to a much younger population, specifically our Gen Z and Millennial demographics, who, as numerous studies continue to show, are responsible for this paradigm shift in consumer marketing. As a customer, a client is given a comprehensive assortment of available mobile food trucks and dispensaries, and upon selecting, is prompted with the quickest route to reach its location with the added feature of in-app purchases and custom signaling, alerting the nearby truck of a person currently navigating in progress.
2. Veneor Side:
   As a vendor, the patron is provided with a custom interactive user interface detailing the various locations, hub spots, where customers are positioned. The software also provides insight into the most optimal area to remain stationed, ensuring a sufficient consumer base. The platform can then create intuitive, customizable in-app reports, summarizing a business's gross revenue stream with any necessary labor costs. 

## System Design
Our system designs begin with selecting their role, customers or vendors. Each user, upon login, has the choice to authenticate themselves either as a consumer or a seller, setting the stage for a personalized and role-specific experience. This initial user role selection is fundamental, as it shapes the entire navigation and functionality within the application. Furthermore, the user-provided information during the sign-up process is securely stored in Firestore. Utilizing geolocation, we retrieve the user’s current location, saving it in Firestore. The dynamic integration of geolocation not only enables accurate storage but also facilitates real-time updates on a map. Customers can search food trucks, placing food orders, and once the order is confirmed, the information is communicated to the database. For the vendor side, they can discover customer hub spots. Also, vendors have the flexibility of managing their menu through the ability to add, edit, or delete menu items.


## Technologies and Packages
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Xcode](https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&logo=Xcode&logoColor=white)
![Android Studio](https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white)

### Packages
1. React Navigation
- @react-navigation
- @react-navigation/native
- @react-navigation/native-stack
2. React Native Maps
- ‘react-native-permissions'
- ‘react-native-maps'
- ‘react-native-maps-directions'
3. Bottom Sheet - [Bottom Sheet Gorhom](https://github.com/gorhom/react-native-bottom-sheet)
- @gorhom/bottom-sheet

### Techologies
1. Geolocation
- ‘react-native-geolocation-service'
2. Firebase
- @react-native-firebase\auth \\ User Authentication
- @react-native-firebase\firestore \\ Real-Time Database

## Get Started
1. Setting Up React Native Environment:
- Initial Setting: [React-Native Get Started](https://reactnative.dev/docs/environment-setup)
2. Preparing Xcode:
- Install Xcode for iOS: [Xcode](https://developer.apple.com/xcode/)
- Set up a simulator in Xcode for testing your app.
3. Preparing Android Studio:
- Install Android Studio for Android: [Android Studio](https://developer.android.com/studio)
- Open Android Studio and install the necessary SDKs and tools using the SDK Manager.

4. Clone Repository

```shell
(clone project)
(cd project folder)
npm i -g react-native(optional)
npm install \\ node_modules
```
5. Running React Native App
```shell
(cd StreetSavor)
npx react-native run-ios \\ run the app on iOS simulator
npx react-native run-android \\ run the app on Android emulator
```
```shell
(Metro bundler)
npm start \\ development build
```
## UIs
<img src="https://github.com/Minseo27/StreetSavor/assets/70563094/f50be2e9-c307-48d1-9a0f-84b7a06abc84" width=200>
<img src="https://github.com/Minseo27/StreetSavor/assets/70563094/2c421b6c-6726-4d65-8b3e-5bba37f6ec14" width=200>
<img src="https://github.com/Minseo27/StreetSavor/assets/70563094/e111c18f-6471-4b93-9112-37e59fa4698f" width=200>
<img src="https://github.com/Minseo27/StreetSavor/assets/70563094/2045060a-e163-4667-9e1d-97636a6958e5" width=200>


