import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../RoomsList.css';

class RoomsList extends Component {
  constructor(props){
    super(props);
    this.state= {
      rooms: [],
      value: '',
      currentRoom: ''
    }
    this.roomsRef= this.props.firebase.database().ref('rooms');
    this.handleChange= this.handleChange.bind(this);
    this.createRoom= this.createRoom.bind(this);
    this.selectChatRoom= this.selectChatRoom.bind(this);
    }

    selectChatRoom(room, index){
      this.props.activeRoom(room);
    }
    componentDidMount(){
       this.roomsRef.on('child_added', snapshot => {
         const room= snapshot.val();
              room.key= snapshot.key;
              this.setState({rooms: this.state.rooms.concat(room)})
       });
    }
    handleChange(e){
      this.setState({value: e.target.value});
    }
    handleSubmit(e) {
      alert("Room " + this.state.value + "is added");
      e.preventDefault();
    }
    createRoom(e){
      this.roomsRef.push({
        name: this.state.value
      })
    }

   render() {
     const list= this.state.rooms.map((room, index)  =>
       <li key= {room.key} onClick={() => this.selectChatRoom(room, index)}>{room.name}</li>
     );

     return (
       <div className= "container">
         <div className= "row">
           <div className= "form">
             <form onSubmit= {this.createRoom}>
               <label>
                 <input type= "text" className= "room-text-field" placeholder= "Room Name" onChange= {this.handleChange}/>
               </label>
               <div className= "create-room-button">
                 <input type= "submit" value= "Submit" />
               </div>
             </form>
           </div>
           <div className= "col-md-6">
             <div className= "rooms-list">
               {list}

           </div>
           </div>
         </div>
       </div>
     );
   }
}

export default RoomsList;
