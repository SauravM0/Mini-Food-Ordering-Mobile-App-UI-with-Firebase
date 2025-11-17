# Mini Food Ordering App

A modern mobile food ordering application built with React Native and Expo, featuring real-time menu updates and order management through Firebase Firestore.

## 🍔 Features

- **Real-time Menu**: View the latest menu items with prices and descriptions
- **Shopping Cart**: Add/remove items and adjust quantities
- **Order Management**: Place orders with customer details
- **Order Confirmation**: Receive confirmation with order ID and estimated delivery time
- **Firebase Integration**: Real-time data synchronization and cloud storage
- **Responsive UI**: Clean, user-friendly interface that works on all device sizes

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="../Menu Page 1.png" alt="Menu Page" width="200"/>
  <img src="../Menu Page 2.png" alt="Menu Page with Items" width="200"/>
  <img src="../Cart Page.png" alt="Cart Page" width="200"/>
  <img src="../Order Summary.png" alt="Order Summary" width="200"/>
  <img src="../Summary Page 2.png" alt="Order Summary with Details" width="200"/>
  <img src="../Confirm Page.png" alt="Order Confirmation" width="200"/>
  <img src="../Profile Page.png" alt="Profile Page" width="200"/>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd mini-food-ordering-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Register your app and replace the Firebase configuration in `src/services/firebaseConfig.js` with your project's config

3. Enable Firestore Database in the Firebase Console

4. Deploy Firestore security rules:
   ```bash
   npm run firebase:deploy-rules
   ```

5. Populate the database with sample menu items:
   ```bash
   npm run populate-menu
   ```

### Running the App

Start the development server:
```bash
npx expo start
```

Then follow the instructions to run on:
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) app on your physical device

## 🛠️ Project Structure

```
mini-food-ordering-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context for state management
│   ├── hooks/          # Custom React hooks
│   ├── navigation/     # App navigation setup
│   ├── screens/        # Screen components
│   ├── services/       # Firebase and API services
│   └── theme/          # Theme and styling constants
├── app/                # Expo router file-based routing
├── assets/             # Images and static assets
├── scripts/            # Utility scripts for Firebase setup
└── ...
```

## 📱 App Flow

1. **Menu Screen**: Browse available food items
2. **Cart Screen**: Review selected items and quantities
3. **Order Summary**: Add customer details and review order
4. **Order Confirmation**: Receive order confirmation with ID

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run firebase:deploy` - Deploy to Firebase
- `npm run firebase:deploy-rules` - Deploy Firestore rules
- `npm run populate-menu` - Add sample menu items to Firestore
- `npm run firebase:setup` - Initialize Firebase configuration

## 🌐 Technologies Used

- [React Native](https://reactnative.dev/) - Mobile app framework
- [Expo](https://expo.dev/) - Development platform for React Native
- [Firebase](https://firebase.google.com/) - Backend as a Service (Firestore, Authentication)
- [React Navigation](https://reactnavigation.org/) - Routing and navigation
- [React Context API](https://reactjs.org/docs/context.html) - State management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to [Unsplash](https://unsplash.com/) for the food images used in this project
- Inspired by modern food delivery applications
