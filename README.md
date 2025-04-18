QR-scan-app

(Note : The app is build on Expo framework of React Native)

# Prebuild command
# this command prebuild the code and make android and ios folders which contains native code
command `npx expo prebuild --clean`

# Build debug apk
command `npx expo run:android`
After building apk the app will directly open on emulator or your device 
THe directory in which the app is available is /qr-scan-app/android/app/build/outputs/apk/debug/app-debug.apk

# Build release apk
command `npx expo run:android --variant release`

THe directory in which the app is available is /qr-scan-app/android/app/build/outputs/apk/release/app-release.apk


# Note -
- Using these command will directly open android emulator on this device itself and launch the app on the emulator
- If you want to launch the debug apk on your device you can do following
   1. USB debugging
   2. Connect with wireless debugging
   - Go to Settings > developer options > wireless debugging
   - Open Pair device with pairing code
      (Note -> Make sure to connect both devices on same network)
      - Enter command in termial `adb pair <ip_address>:<port>` and hit enter
      - Enter the pairing code and hit enter
      - Now pairing is completed
   - Now you will see IP Address and port option in wireless debugging below device name
   - Enter the command ` adb connect <ip_address>:<port>` and hit enter
   - Now your device is connected for wireless debugging
   - Now you can try the above mention commands to build the app on your device (debug / release)
