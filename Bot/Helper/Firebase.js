CFG.firebaseconfig.apiKey = process.env.APIKEY;
Firebase.initializeApp(CFG.firebaseconfig);
global.DB = Firebase.database();