import React from 'react';

//Import Field component, reduxForm function
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{
  renderError({ error, touched }){//meta object has these properties
    if( touched && error) {
      return (
        <div className= "ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta}) => {//destructure form props
    //console.log(formProps);
    const className = `field ${meta.error && meta.touched? 'error' : ''}`;
    return ( 
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) =>{//values of the fields in the form
    //event.preventDefault(); don't need this; redux takes care of it

    //Call the onSubmit callback passed down
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description"/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
};

//Validation function to validate form values
//Since the error message has keys with the same name as the fields, they will get passed
//into the renderInput function
const validate = (formValues) => {
  const errors = {};
  if(!formValues.title){
    errors.title = 'You must enter a title';    //same name as field
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description'; //same name as field
  }
  return errors;
};

//Wrap StreamForm inside reduxForm function
export default reduxForm({
  form: 'streamForm', //form purpose
  validate //pass validate function to form
})(StreamForm);


