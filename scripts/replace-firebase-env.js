const fs = require('fs');

const config = `
window.firebaseConfig = {
  apiKey: "${process.env.REACT_APP_FIREBASE_API_KEY}",
  authDomain: "${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.REACT_APP_FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.REACT_APP_FIREBASE_APP_ID}"
};
`;

fs.writeFileSync('./public/firebase-config.js', config);
console.log('🔥 Firebase config injected into firebase-config.js');
