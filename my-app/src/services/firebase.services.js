// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO2BBRKNK2K3unr9_fRYlM0hcZX7cKf54",
  authDomain: "tfeedback-ee356.firebaseapp.com",
  projectId: "tfeedback-ee356",
  storageBucket: "tfeedback-ee356.appspot.com",
  messagingSenderId: "946893227462",
  appId: "1:946893227462:web:2f86c842bb32c6e9e41ec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage=getStorage(app)


export const StoreImage =async (image) => {
    return new Promise(async(resolve,reject)=>{
        var imgRef = ref(storage,`images/${image.name}`)
        var metadata = { contentType: image.type };
        await uploadBytesResumable(imgRef,image,metadata).then(async(res)=>{
            await getDownloadURL(res.ref).then((url)=>{
                resolve(url)
                return
            }).catch(err=>{
                console.log(err)
                reject("Some error occured! Please try again")
                return
            })
        }).catch(err=>{
            console.log(err)
            reject("Some error occured! Please try again")
            return
        })
    })
    
}