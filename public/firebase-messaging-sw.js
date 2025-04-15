/* eslint-disable no-undef */
/* global firebase */

// Import Firebase libraries
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');
importScripts('/firebase-config-prod.js'); // Import the dynamically generated config

// Initialize Firebase with the injected config
firebase.initializeApp(self.firebaseConfig);


// Initialize Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message!',
    icon: payload.notification?.icon || '/logo192.png',
    requireInteraction: true,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === 'https://gethangapp.com/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Safari might block new tabs; open anyway
      return clients.openWindow('https://gethangapp.com/');
    })
  );
});
