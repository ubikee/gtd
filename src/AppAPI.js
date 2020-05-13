import { HTTPClient, Session } from 'ywana-core6'
import firebase from 'firebase'

const http = HTTPClient(process.env.REACT_APP_API, Session);

var firebaseConfig = {
    apiKey: "AIzaSyBKZERFFQxaw3wQJxkGltdgMEvQtrYOKJU",
    authDomain: "tasks-35737.firebaseapp.com",
    databaseURL: "https://tasks-35737.firebaseio.com",
    projectId: "tasks-35737",
    storageBucket: "tasks-35737.appspot.com",
    messagingSenderId: "743247988916",
    appId: "1:743247988916:web:3d6f934f5f412d31a06fe1"
}

firebase.initializeApp(firebaseConfig);

/**
 * API
 */
const API = {

    collection: null,

    login(email, password, onOK) {
        firebase.auth().onAuthStateChanged(user => { if (user) onOK(user) })
        firebase.auth().signInWithEmailAndPassword(email, password)
    },

    init() {
        this.collection = firebase.firestore().collection('tasks')
    },

    async tasks() {
        return await this.collection.get().then(snapshot => {
            return snapshot.docs.map(doc => Object.assign({}, doc.data(), { id: doc.id}))
        })
    },

    async task(id) {
        return await this.collection.doc(id).get().then(doc => {
            return Object.assign({}, doc.data(), { id: doc.id})
        })
    },

    async addTask(form) {
        return await this.collection.add(form)
    },

    async updateTask(id, form) {
        return await this.collection.doc(id).update(form).then(doc => {
            console.log('updated', id)
        })
    },

    async deleteTask(id) {
        return await this.collection.doc(id).delete().then(doc => {
            console.log('deleted', id)
        })
    }

}

export default API
