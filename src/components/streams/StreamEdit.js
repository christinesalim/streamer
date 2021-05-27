import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  
  onSubmit = (formValues) => {
    //call action creator to edit the stream
    this.props.editStream(this.props.match.params.id, formValues);
  }


  render(){    
    if(!this.props.stream){
      return <div>Loading...</div>
    }
    
    //only get the title and description for our initial values
    const { id, userId, ...initialValues } = this.props.stream;
    
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={ initialValues }
          onSubmit={this.onSubmit} />
      </div>

    );
  }
};


//List of streams is maintained in state store; 
//Get the id of the stream from props using ownProps parameter
//Get the stream with that id and load it into this component
const mapStateToProps = (state, ownProps) => {
  //Store title and description for this stream
  return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream } //action creators
)(StreamEdit);