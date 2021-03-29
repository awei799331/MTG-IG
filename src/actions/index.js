import axios from 'axios';

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

export const resetSearch = () => {
  return {
    type: 'RESETSEARCH'
  }
}

export const requestScryfall = (q, unique, order, dir, page) => {
  return function(dispatch) {
    dispatch(setStatusLoading());
    axios.get('https://api.scryfall.com/cards/search', {
      params: {
        q,
        unique,
        order,
        dir,
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