import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../messageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state= {
      data: [],
      username: '',
      content: [],
      roomId: '',
      sentAt: '',
      value: 0
    };
    this.messagesRef= this.props.firebase.database().ref('messages');
    this.createData= this.createData.bind(this);
    this.handleChange= this.handleChange.bind(this);
    }


  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const apiData= snapshot.val();
        apiData.key= snapshot.key;
        this.setState({data: this.state.data.concat(apiData)})
        console.log(this.state.data);
    });
  }

  createData(e){
    console.log(e.target.value);
    var timestamp = Date.now();
    this.messagesRef.push({
      username: 'moose',
      content: "boo",
      roomId: '20',
      sentAt: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp),
      testSentAt: firebase.database.ServerValue.TIMESTAMP
    })
  }
  handleChange(e){
    this.setState({content: e.target.value});
    console.log("boo");
    console.log(this.state.content);
  }
  putDataInState(){
    this.state.data.map((data, index) =>
      {
        this.state.username= data.username;
        this.state.content+= data.content;;
        this.state.roomId= data.roomId;
        this.state.sentAt= data.sentAt;
      }
    )
  }

  render() {
    this.putDataInState()


    return(
      <div>
        {
          this.state.data.map((data, index) =>
            <ul key= {index}>
              <li>{data.username}</li>
              <li>{data.content}</li>
              <li>{data.roomId}</li>
              <li>{data.sentAt}</li>
            </ul>
        )}
        <form onSubmit= {this.createData}>
          <textarea className= "text-message-field" placeholder= "Write your message"  onChange= {this.handleChange}/>
          <div className= "text-area-button">
            <input type= "submit" value= "Send" />
          </div>
        </form>
      </div>
    )
  }
}
export default MessageList;
