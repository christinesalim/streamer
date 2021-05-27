import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

//Used class component because we need to fetch list of 
//streams once when the component mounts
class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  //Allow creator of stream to edit or delete it: admin privileges
  renderAdmin(stream){
    if (stream.userId === this.props.currentUserId){
      return (
        <div className = "right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map( stream => {
      return (
        <div className = "item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className = "large middle aligned icon camera" />
          <div className = "content">
            <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
            <div className= "description">{stream.description}</div>

          </div>          
        </div>
      );
    });
  }

  //Renders the create button to create a new stream if user 
  //is signed in
  renderCreate() {
    if (this.props.isSignedIn){
      return (        
        //shift button to the right
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {    
    return (
      <div>
        <h2>Streams</h2>
        <div className = "ui celled list">{this.renderList()}
          {this.renderCreate()}
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  //return array of streams from the state object
  return { 
    streams: Object.values(state.streams), 
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };

}

export default connect(mapStateToProps, {fetchStreams})(StreamList);