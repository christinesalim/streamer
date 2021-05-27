import streams from '../apis/streams';
import history from '../history';

import {
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM, 
  DELETE_STREAM,
  EDIT_STREAM} from './types';

//Action Creators

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
};

//formValues contains title and description 
//getState allows us to get userId from state store
export const createStream = formValues => async (dispatch, getState) => {
  //Destructure out the userId
  const { userId } = getState().auth;
  //Create a new stream with POST method
  const response = await streams.post('/streams', {...formValues, userId });

  //Dispatch the action creator
  dispatch( { type: CREATE_STREAM, payload: response.data });
  //Do programmatic navigation to get the user back to 
  //the root route
  history.push('/'); //go to '/' to show the list of streams
};

export const fetchStreams = () => async dispatch => {
  //Use GET method to fetch streams
  const response = await streams.get('/streams');

  //Dispatch action creator
  dispatch( { type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  //Use GET method to fetch a specific stream
  const response = await streams.get(`/streams/${id}`);
  dispatch( {type: FETCH_STREAM, payload: response.data });
};

//form values contains values to edit: title and description
export const editStream = (id, formValues) => async dispatch => {
  //PATCH method to edit stream with properties we send
  //Only update title and/or description
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch ({ type: EDIT_STREAM, payload: response.data });
  history.push('/'); //go to '/' to show the list of streams
};

export const deleteStream = id => async dispatch => {
  //DELETE method to delete the stream
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id});
  history.push('/'); //navigate to '/' after delete
};