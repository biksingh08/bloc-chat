import React, { Component } from 'react';

class RoomsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      value: ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
    }
    handleChange(e){
    this.setState({ value: e.target.value });
    console.log(this.state.rooms[0].key);
    }
    handleSubmit(e) {
    alert("Room " + this.state.value + "is added");
    e.preventDefault();
  }
    createRoom(){
      this.roomsRef.push({
        name: this.state.value
      });
    }

  componentDidMount(){
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
      <div>
          <div>{list}</div>
         <div className="form">
          <form onSubmit={this.createRoom.bind(this)}>
              <label>
                  <input type="text" placeholder="room name" value={this.state.value} onChange={this.handleChange.bind(this)}/>
              </label>
            <div className="Form-button">
              <input type="submit" value="Submit"/>
            </div>
          </form>
         </div>
      </div>
     );
   }
 }

export default RoomsList;
