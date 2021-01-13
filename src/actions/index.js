import axios from 'axios';

export const selectUnique = (option) => {
  return {
    type: 'SELECTUNIQUE',
    payload: option
  };
}

export const updateQuery = (newQuery) => {
  return {
    type: 'UPDATEQUERY',
    payload: newQuery
  };
}

export const setStatusLoading = () => {
  return {
    type: 'SETSTATUSLOADING',
    payload: 'loading'
  }
}

export const setStatusMulti = () => {
  return {
    type: 'SETSTATUSMULTI',
    payload: 'multi'
  }
}

export const setStatusSingle = () => {
  return {
    type: 'SETSTATUSSINGLE',
    payload: 'single'
  }
}

export const setStatusError = (error) => {
  return {
    type: 'SETSTATUSERROR',
    payload: error
  }
}

export const setStatusNone = () => {
  return {
    type: 'SETSTATUSNONE'
  }
}


export const setResponse = (res) => {
  return {
    type: 'SETRESPONSE',
    payload: res
  }
}

export const requestScryfall = (q, unique, page) => {
  return function(dispatch) {
    dispatch(setStatusLoading());
    axios.get('https://api.scryfall.com/cards/search', {
      params: {
        order: 'name',
        q,
        unique,
        page
      }
      })
      .then(res => {
        dispatch(setResponse(res.data));
        return res.data;
      })
      .then(res => {
        if (res.object === 'list' && (res.data.length > 1)) {
          dispatch(setStatusMulti());
        } else if (res.object === 'list' && (res.data.length === 1)) {
          dispatch(setStatusSingle());
        } else {
          dispatch(setStatusNone());
        }
      })
      .catch(e => {
        dispatch(setStatusError(e))
      });
  }
}