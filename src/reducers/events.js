import _ from 'lodash'
import { READ_EVENTS, CREATE_EVENT } from '../actions'

export default (events = {}, action) => {
  switch(action.type) {
    case READ_EVENTS:
      return _.mapKeys(action.res.data, 'id')
    case CREATE_EVENT:
      const data = action.res.data
      console.log(data)
      console.log(data.id)
      return { ...events, [data.id]: data }
    default:
      return events
  }
}