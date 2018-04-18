import React, { Component } from 'react';
import '../User.css'

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn= this.signIn.bind(this);
    this.signOut= this.signOut.bind(this);
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
    });
  }

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      this.props.setUser(result.user);
      console.log('test');
      console.log(result.user);
    });
  }

  signOut(){
    this.props.firebase.auth().signOut().then(()=>{
      this.props.setUser(null);
    });
  }

  render() {

    return(
      <div className="login-page">
        <div className="sign-in-button">
          <input type="button" value="Login" onClick={this.signIn}/>
        </div>
        <div className="sign-out-button">
          <input type="button" value="Logout" onClick={this.signOut}/>
        </div>
      </div>
    );
  }
}
export default User;
