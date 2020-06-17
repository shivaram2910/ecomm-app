import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config ={
    apiKey: "AIzaSyCR794OVa0ciWrY35amA_UN5RL5asOY9s8",
    authDomain: "ecomm-db-b9806.firebaseapp.com",
    databaseURL: "https://ecomm-db-b9806.firebaseio.com",
    projectId: "ecomm-db-b9806",
    storageBucket: "ecomm-db-b9806.appspot.com",
    messagingSenderId: "1046308133740",
    appId: "1:1046308133740:web:d3cc811e578253441ab149",
    measurementId: "G-E6HT1EG1BE"
}

export const createUserProfileDocument = async (userAuth,additionalData) =>{
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

if(!snapShot.exists){
    const {displayName,email}=userAuth;
const createdAt =new Date();

try{

    await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
    })
}catch(error){
    console.log('error creating user', error.message);
}

}
return userRef;

}

export const convertCollectionsSnapshotToMap =(collections) =>{
    const transformedCollection = collections.docs.map(doc =>{
        const {title,items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()]=collection;
        return accumulator;
    },{});
}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });

    return await batch.commit();
}

firebase.initializeApp(config);

export const auth =firebase.auth();
export const firestore=firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;