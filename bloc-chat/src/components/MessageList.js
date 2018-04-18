import React, { Component } from 'react';
import '../messageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state= {
      data: [],
      username: '',
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
        apiData.key= snapshot.key;
        this.setState({data: this.state.data.concat(apiData)})
    });
  }
  createData(e) {
    var timestamp = Date.now();
    e.preventDefault();
      this.messagesRef.push({
        username: this.props.activeUser,
        content: this.state.content,
        roomId: this.props.activeRoom.key,
        sentAt: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
      });
      this.setState({ username: "", content: [], sentAt: ""});
  }

  handleChange(e){
    this.setState({content: e.target.value});
  }
  render() {
    const apiData = this.state.data;
    var filteredMessage = apiData.filter(eachObject => eachObject.roomId === this.props.activeRoom.key);

    return(
      <div>
      {
        filteredMessage.map((eachObject, index) =>
          <ul key={index} className="text-message">
            <li>{eachObject.content}</li>
            <li>{eachObject.username}</li>
            <li>{eachObject.sentAt}</li>
          </ul>
      )
      }
        <form onSubmit= {this.createData}>
          <textarea id= "text-message-field" value={this.state.content} placeholder= "Write your message"  onChange= {this.handleChange}/>
          <div className= "text-area-button">
            <input type= "submit" value= "Send" />
          </div>
        </form>
      </div>
    )
  }
}
export default MessageList;
