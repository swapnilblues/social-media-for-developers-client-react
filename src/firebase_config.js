import firebase from 'firebase/app';
import 'firebase/storage';

var config={
    apiKey: "AIzaSyBeMKAtl4ZQucjfs6CpGrALxLfzbR-x_wI",
    authDomain: "ecommerceweb-8831e.firebaseapp.com",
    databaseURL: "https://ecommerceweb-8831e.firebaseio.com",
    projectId: "ecommerceweb-8831e",
    storageBucket: "ecommerceweb-8831e.appspot.com",
    messagingSenderId: "314743947882",
    appId: "1:314743947882:web:46d3c02d6dce8c65"
};

firebase.initializeApp(config);

const storage=firebase.storage();

export {
    storage, firebase as default
}
