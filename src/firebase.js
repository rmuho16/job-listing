import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
} from "firebase/auth"
import {
    collection,
    serverTimestamp,
    addDoc,
    where,
    query,
    doc,
    getFirestore,
    updateDoc,
    getDocs,
    deleteDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCzSfnqzbazUcxxQ4uu8bhin2ROE27aE_c",
    authDomain: "job-listing-4ea7f.firebaseapp.com",
    projectId: "job-listing-4ea7f",
    storageBucket: "job-listing-4ea7f.appspot.com",
    messagingSenderId: "809627361405",
    appId: "1:809627361405:web:1c7cdf39952c1f97235114",
    measurementId: "G-GE0GNHRHF4"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export async function register(email, password, type) {
    await createUserWithEmailAndPassword(auth, email, password)

    await addDoc(collection(db, 'users'), {
        email: email,
        type: type,
        timestamp: serverTimestamp()
    })
}

export async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)

    const users = await getDocs(query(collection(db, "users"), where("email", "==", email)))

    let result = null
    users.forEach((doc) => {
        result = doc.data()
    });
    return result
}

export async function signOut() {
    await firebaseSignOut(auth)
}

export async function getAllJobListings() {
    const jobs = await getDocs(query(collection(db, "jobListings")))
    return jobs.docs.map(doc => doc.data()).sort((a,b) => b.id - a.id)
}

export async function crateJobListing(listing) {
    await addDoc(collection(db, 'jobListings'), listing)
}

export async function editJobListing(listing) {

    const q = query(collection(db,'jobListings'), where("id", "==", listing.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((foundDoc) => {
        const ref = doc(db, 'jobListings', foundDoc.id);
        updateDoc(ref,listing).then(()=>{});
    });
}

export async function deleteJobListing(deleteId) {
    let jobs = await getDocs(query(collection(db, "jobListings")))

    jobs.forEach( (job) => {
        let data = job.data()
        let id = job.id
        if (data.id === deleteId) {
            deleteDoc(doc(db, 'jobListings', id))
        }
    })

}

export async function getApplications(email) {
    const applications = await getDocs(query(collection(db, "applications"), where("email", "==", email)))
    return applications.docs.map(doc => doc.data()).sort((a,b) => b.id - a.id)

}

export async function createApplication(application) {
    await addDoc(collection(db, 'applications'), application)
}

export async function deleteApplication(deleteId) {
    let applications = await getDocs(query(collection(db, "applications")))

    applications.forEach( (application) => {
        let data = application.data()
        let id = application.id
        if (data.id === deleteId) {
            deleteDoc(doc(db, 'applications', id))
        }
    })

}



export async function getFavorites(email) {
    const favorites = await getDocs(query(collection(db, "favorites"), where("email", "==", email)))
    return favorites.docs.map(doc => doc.data()).sort((a,b) => b.id - a.id)

}

export async function createFavorite(application) {
    await addDoc(collection(db, 'favorites'), application)
}

export async function deleteFavorite(deleteId) {
    let favorites = await getDocs(query(collection(db, "favorites")))

    favorites.forEach( (fav) => {
        let data = fav.data()
        let id = fav.id
        if (data.id === deleteId) {
            deleteDoc(doc(db, 'favorites', id))
        }
    })

}