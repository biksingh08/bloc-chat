import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomsList from './components/RoomsList';
import './App.css';

var config = {
  apiKey: "AIzaSyCp7b0qve9Wzgf5S7AEsQmH35weoK8ta8E",
  authDomain: "bloc-chat-9dfb5.firebaseapp.com",
  databaseURL: "https://bloc-chat-9dfb5.firebaseio.com",
  projectId: "bloc-chat-9dfb5",
  storageBucket: "bloc-chat-9dfb5.appspot.com",
  messagingSenderId: "624436744560"
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
      <h1 className="main-title">Bloc Chat</h1>
      </header>
        <main>
        <div>
        <RoomsList firebase = {firebase}/>
        </div>
        </main>
      </div>
    );
  }
}
export default App;
