// scripts/initFirebase.js
// Script to initialize Firebase and provide setup instructions

console.log('Firebase Setup Instructions');
console.log('==========================');
console.log('');
console.log('1. Go to https://console.firebase.google.com/');
console.log('2. Create a new Firebase project or select an existing one');
console.log('3. In the Firebase Console, go to Project Settings');
console.log('4. Under "Your apps", click the "Web" icon to create a new web app');
console.log('5. Register your app with a nickname (e.g., "Food Ordering App")');
console.log('6. Firebase will provide you with a config object like this:');
console.log('');
console.log('const firebaseConfig = {');
console.log('  apiKey: "AIzaSyD7_WqXp9CEOeD7hq7MxkwPrPo0slaXmnY",');
console.log('  authDomain: "mini-food-ordering-olcademy.firebaseapp.com",');
console.log('  projectId: "mini-food-ordering-olcademy",');
console.log('  storageBucket: "mini-food-ordering-olcademy.firebasestorage.app",');
console.log('  messagingSenderId: "407536957432",');
console.log('  appId: "1:407536957432:web:e8a8a779fb12836d9ac80d"');
console.log('};');
console.log('');
console.log('7. Copy this config object and replace the placeholder values in:');
console.log('   src/services/firebaseConfig.js');
console.log('');
console.log('8. Enable Firestore Database in the Firebase Console:');
console.log('   - Go to Firestore Database in the left sidebar');
console.log('   - Click "Create database"');
console.log('   - Start in test mode (or production mode with the rules we provided)');
console.log('');
console.log('9. Deploy the Firestore security rules:');
console.log('   npm run firebase:deploy-rules');
console.log('');
console.log('10. Populate the database with sample menu items:');
console.log('    npm run populate-menu');
console.log('');
console.log('For more information, check the README.md file.');