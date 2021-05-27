import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{
  
  componentDidMount() {
    //Load the client:auth2 library into gapi
    window.gapi.load('client:auth2',()=>{
      //After loading client library initialize it with 
      //clientId with this callback function
      window.gapi.client.init({
        clientId: '604736446143-cb2b3l5kqt3i4596rk9gdeo3lrmd2ufv.apps.googleusercontent.com',
        scope: 'email' //will use email authentication in our App
      }).then(() => {
        //init completed; get reference to auth instance
        this.auth = window.gapi.auth2.getAuthInstance();
        //update auth state in redux store
        this.onAuthChange(this.auth.isSignedIn.get());
        //handle on the fly auth status changes
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId()); //action creator
    }else {
      this.props.signOut();
    }    
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null){
      return null;
    } else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          SignOut
        </button>
      );
    }else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"/>
          SignIn
        </button>
      );
    }
  }

  render(){
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  //We get auth.isSignedIn state from the reducers
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect (mapStateToProps, { signIn, signOut })(GoogleAuth);