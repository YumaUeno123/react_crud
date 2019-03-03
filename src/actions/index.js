import axios from 'axios'

export const READ_EVENTS = 'READ_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENT'
export const READ_EVENT = 'READ_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

export const readEvents = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
  dispatch({type: READ_EVENTS, res})  
}

export const postEvent = values => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
  dispatch({type: CREATE_EVENT, res})
}

export const getEvent = id => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: READ_EVENT, res })
}

export const editEvent = values => async dispatch => {
  const res = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
  dispatch({ type: EDIT_EVENT, res })
}

export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: DELETE_EVENT, id })
}