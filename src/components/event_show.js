import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { getEvent, editEvent, deleteEvent } from '../actions'

class EventShow extends  Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if(id) this.props.getEvent(id)
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.editEvent(values)
    this.props.history.push('/')
  }

  renderField(field) {
    const {input, label, type, meta: {touched, error} } = field
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        { touched && error && <span>{error}</span>}
      </div>
    )
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="title" name="title" type="text" component={this.renderField} />
        </div>
        <div>
          <Field label="body" name="body" type="text" component={this.renderField} />
        </div>
        <div>
          <input type="submit" value="submit" disabled={pristine || submitting || invalid} />
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if(!values.title) errors.title = 'Enter a title, please' 
  if(!values.body) errors.body = 'Enter a body, please'
  
  return errors
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

const mapDispatchToProps = ({ getEvent, editEvent, deleteEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventShow)
)