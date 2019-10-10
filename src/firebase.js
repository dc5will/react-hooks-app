import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyBRSfSDPE09Xou2syDN1HwgLQuZ4i9iJ2I",
  authDomain: "react-hooks-4ed7a.firebaseapp.com",
  databaseURL: "https://react-hooks-4ed7a.firebaseio.com",
  projectId: "react-hooks-4ed7a",
  storageBucket: "react-hooks-4ed7a.appspot.com",
  messagingSenderId: "1044290149214",
  appId: "1:1044290149214:web:884986e93b88dbc7718dcf",
  measurementId: "G-S2EQ3KQZFN"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addReview(review) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }
    return this.db.collection("reviews").add({
      review
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getReviews() {
    const reviews = await this.db.collection("reviews").get();
    return reviews;
  }
}

export default new Firebase();
