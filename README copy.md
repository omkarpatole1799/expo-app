```markdown
# 📱 QR Scan App

**Platform**: React Native (built with the [Expo](https://expo.dev) framework)  
**Project Name**: `qr-scan-app`

---

## 🧰 Prerequisites

Before you begin, make sure you have the following installed and configured:

- [Node.js](https://nodejs.org/) and npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Android Studio (with emulator setup)
- A physical Android device (optional)
- ADB (Android Debug Bridge) installed and accessible in your terminal

---

## 🚧 Prebuild Native Code

This step is necessary to generate native Android and iOS code directories.

```bash
npx expo prebuild --clean
```

This command:

- Cleans previous builds
- Generates `android/` and `ios/` native folders
- Prepares the project for native builds

---

## 🛠️ Build Debug APK

To build and run the app in debug mode:

```bash
npx expo run:android
```

- The app will automatically open on a connected device or emulator.
- The generated debug APK will be available at:

```
/qr-scan-app/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 Build Release APK

To build the app in release mode:

```bash
npx expo run:android --variant release
```

- The release APK will be generated at:

```
/qr-scan-app/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📲 Install & Launch on Physical Android Device

### Option 1: USB Debugging

1. Enable **USB Debugging** on your Android device (Settings > Developer Options > USB Debugging).
2. Connect your device via USB.
3. Run the build command:

```bash
npx expo run:android
```

Expo CLI will detect your device and install the app automatically.

---

### Option 2: Wireless Debugging (ADB)

1. On your device, enable:
   - **Developer Options**
   - **Wireless Debugging**:  
     `Settings > Developer Options > Wireless Debugging`

2. Tap **Pair device with pairing code**.

3. In your terminal, run:

```bash
adb pair <ip_address>:<port>
```

4. Enter the pairing code when prompted.

5. After successful pairing, run:

```bash
adb connect <ip_address>:<port>
```

6. Once connected, you can build and install the app wirelessly:

```bash
npx expo run:android
```

> 💡 **Note**: Both your computer and Android device must be on the same network for wireless debugging to work.

---

## 📝 Notes

- These commands will automatically open the Android emulator or launch the app on your connected device.
- For production release, additional app signing steps may be necessary (keystore setup, etc.).
- iOS builds require macOS and Xcode.

---

## 📦 Project Structure

```bash
qr-scan-app/
├── android/              # Native Android project (generated after prebuild)
├── ios/                  # Native iOS project (generated after prebuild)
├── assets/               # App assets
├── components/           # Reusable components
├── App.js                # Main entry point
├── app.json              # Expo configuration
└── ...
```

---

## 🧑‍💻 Useful Commands

| Command                                 | Description                                 |
|----------------------------------------|---------------------------------------------|
| `npx expo prebuild --clean`            | Prebuild and clean native folders           |
| `npx expo run:android`                 | Build & launch debug APK                    |
| `npx expo run:android --variant release` | Build & launch release APK                |
| `adb devices`                          | List connected devices                      |
| `adb pair <ip>:<port>`                 | Pair with a device via wireless debugging   |
| `adb connect <ip>:<port>`              | Connect to a device over Wi-Fi              |

---