import axios from 'axios';

// firebase app api key
const API_KEY = "AIzaSyArll71jJv8e_pDv-4D7kBIdctf0A3KYDI";
// auth domain for firebase authentication
const AUTH_DOMAIN = "tarkov-battle-buddy-b9c93.firebaseapp.com";

async function authenticate(mode: string, email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );

    const token = response.data.idToken;

    return token;
}

export function createUser(email: string, password: string) {
    return authenticate('signUp', email, password);
}

export function login(email: string, password: string) {
    return authenticate('signInWithPassword', email, password);
}