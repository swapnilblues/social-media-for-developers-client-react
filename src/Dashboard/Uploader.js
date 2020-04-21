import {storage} from "../firebase_config";

function uploadSuccess(filename) {
    storage.ref('Uploaded_Images').child(filename).getDownloadURL().then(url => {
        let newA = url;
        return newA;
    })
}

export  default uploadSuccess;
