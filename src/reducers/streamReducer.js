import _ from 'lodash';

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

 const streamReducer = (state = {}, action ) => {
  switch(action.type){
    case FETCH_STREAMS:
      //spread the state object first to copy its values then
      //use mapKeys to create a new object indexed by the id
      //and spread that object to update the state for that id
      return { ...state, ..._.mapKeys(action.payload, 'id' )};
    case FETCH_STREAM:
      //update the stream in the state for this id with this
      //record from the payload
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }

    case DELETE_STREAM:
      //use lodash's omit() to delete the stream with the id
      //payload has the id
      return _.omit(state, action.payload);
    default:
      return state;
  }

 };


 export default streamReducer;