import { combineReducers } from 'redux';

const searchInitialState = {
  query: '',
  unique: 'cards',
  page: 1
}

const responsesInitialState = {
  status: 'none',
  errorMessage: '',
  response: {}
}

const searchReducer = (state = searchInitialState, action) => {
  switch(action.type) {
    case 'SELECTUNIQUE':
      return {
        ...state,
        unique: action.payload
      };
    case 'UPDATEQUERY':
      return {
        ...state,
        query: action.payload
      };
    default:
      return state;
  }
}

const responsesReducer = (state = responsesInitialState, action) => {
  switch(action.type) {
    case 'REQUESTSCRYFALL':
      return {
        ...state
      };
    case 'SETSTATUSLOADING':
      return {
        ...state,
        status: action.payload
      }
    case 'SETRESPONSE':
      return {
        ...state,
        response: action.payload
      }
    case 'SETSTATUSMULTI':
      return {
        ...state,
        status: 'multi'
      }
    case 'SETSTATUSSINGLE':
      return {
        ...state,
        status: 'single'
      }
    case 'SETSTATUSERROR':
      return {
        ...state,
        status: 'none',
        errorMessage: action.payload
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  search: searchReducer,
  responses: responsesReducer
})

export default rootReducer;