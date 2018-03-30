import React, { Component } from 'react';

class RoomsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
           });
   }
   render() {
     const list = this.state.rooms.map((room, index)  =>
      <li key = {room.key}>{room.name} </li>
     );
     return (

      <div>{list}</div>
     );
   }
}

export default RoomsList;
