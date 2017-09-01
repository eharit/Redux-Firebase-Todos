import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TodoItem extends Component {
  handleClick() {
    this.props.deleteTodo(this.props.id);
  }

  handleToggle(e) {
    e.preventDefault();
    this.props.toggleDone(this.props.id, this.props.todo.done);
  }

  render() {
    return (
      <li className={`panel-block is-justified-space-between`}>
        <h6>
          <a onClick={this.handleToggle.bind(this)} className={`icon is-size-6 ${this.props.todo.done ? 'has-text-primary' : 'has-text-grey-lighter'}`}>
            <i className="fa fa-check"></i>
          </a>&nbsp;&nbsp;
          <span className={`${!this.props.todo.done ? '' : 'has-text-grey-light todo-done'}`}>
            {this.props.todo.name}
          </span>
        </h6>
        <h5
          onClick={this.handleClick.bind(this)}
          className="delete">
        </h5>
      </li>
    );
  }
}

export default connect(null, actions)(TodoItem);
