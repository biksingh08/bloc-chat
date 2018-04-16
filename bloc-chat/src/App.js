import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import RoomsList from './components/RoomsList';
import MessageList from './components/MessageList';
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
  constructor(props){
    super(props);
    this.state= {
      activeRoom: ''
    };
    this.activeRoom= this.activeRoom.bind(this);
  }

  activeRoom(room){
    this.setState({activeRoom: room});
  }

  render() {
    console.log(this.state.activeRoom);

    return (
        <div className= "App">
          <div className= "row">
            <div className= "col-md-3">
              <header>
                <h1 className= "main-title">Bloc Chat</h1>
              </header>
              <div>
                <RoomsList activeRoom= {this.activeRoom} firebase= {firebase}/>
              </div>
            </div>
            <div className= "col-md-9">
              <div className= "current-room">
                <h2>{this.state.activeRoom.name}</h2>
              </div>
            <div className= "message-list-container">
              <MessageList activeRoom= {this.state.activeRoom} firebase= {firebase}/>
            </div>

            </div>
          </div>
        </div>
    );
  }
}
export default App;
