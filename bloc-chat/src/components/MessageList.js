import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../messageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state= {
      data: [],
      username: 'boo',
      content: [],
      messages: [],
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
        console.log(snapshot.val());
          apiData.key= snapshot.key;
          this.setState({data: this.state.data.concat(apiData)})
      });
    }
    createData(e) {
      const messagesRef = this.props.firebase.database().ref('messages' + '/' + this.props.activeRoom);
      var timestamp = Date.now();
      e.preventDefault();
        messagesRef.push({
          username: this.state.username,
          content: this.state.content,
          sentAt: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
        });
        this.setState({ username: "", content: [], sentAt: ""});
    }

  handleChange(e){
    this.setState({content: e.target.value});
    console.log(this.props.activeRoom);
  }
  render() {


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
