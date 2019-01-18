import {
    FETCH_COMMIT_HISTORY
  } from '../actions/types';
  
  const INITIAL_STATE = {
    data: [],
    isFetching: true
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COMMIT_HISTORY:{
            state.data = action.payload;
            console.log("Commit History reducer");
            console.log(state);
            if(state.data != null){
                return { state, isFetching: false };
            }
      }
      default:
        return state;
    }
  }
