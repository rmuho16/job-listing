import {
    register as firebaseRegister,
    signIn as firebaseSignIn,
    signOut as firebaseSignOut,
} from "../firebase"

const signIn = async (email, password) => {
    return await firebaseSignIn(email, password).then((user) => {
        localStorage.setItem('email', email)
        localStorage.setItem('type', user.type)

        return true
    }).catch((err) => {
        console.log(err)
        return false
    })
}

const register = async (email, password, type) => {
    try {
        await firebaseRegister(email, password, type)

        localStorage.setItem('email', email)
        localStorage.setItem('type', type)
        return true
    } catch (err) {
        return false
    }
}

const signOut = async () => {
    try {
        await firebaseSignOut()

        localStorage.removeItem('email')
        localStorage.removeItem('type')

        return true
    } catch (err) {
        return false
    }
}

const isLoggedIn = () => {
    return localStorage.getItem('email') !== undefined && localStorage.getItem('email') !== null
}

const userEmail = () => {
    return localStorage.getItem('email')
}

const userType = () => {
    return localStorage.getItem('type')
}

const isJobSeeker = () => {
    return localStorage.getItem('type') === 'jobSeeker'
}

const isRecruiter = () => {
    return localStorage.getItem('type') === 'recruiter'
}

export {
    signIn,
    register,
    userType,
    userEmail,
    signOut,
    isLoggedIn,
    isJobSeeker,
    isRecruiter
}