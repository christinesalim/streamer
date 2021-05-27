import React from 'react';

import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component{
  
  onSubmit = (formValues) =>{//values of the fields in the form
    //event.preventDefault(); don't need this; redux takes care of it

    //Call action creator
    this.props.createStream(formValues);
  };

  render(){
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
};


export default connect(null, { createStream })(StreamCreate);