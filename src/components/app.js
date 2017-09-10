import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoItem from './todo_item';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PieChart from 'react-simple-pie-chart';

class App extends Component {
  state = { todo: '', user: null };
  // udApp = this

  componentDidMount() {
    let tmt = setTimeout(() => {
      this.props.checkAuth();
      clearTimeout(tmt);
      tmt = null;
    }, 50)
    console.info(App)
  }

  login() {
    this.props.login();
  }

  logout() {
    this.props.logout();
  }

  handleInputChange(event) {
    this.setState({ todo: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.createTodo(this.state.todo, _.size(this.props.todos));
    this.setState({ todo: { name: '' } });
  }

  renderTodos() {
    return _.map(this.props.todos, (todo, key) => {
      return <TodoItem key={key} todo={todo} id={key} />
    });
  }

  render() {
    const transitionOptions = {
      transitionName: "fade",
      transitionEnterTimeout: 250,
      transitionLeaveTimeout: 250
    };
    return (
      <div>
        {this.props.user ?
          <button className={`${this.props.app.loading ? "is-loading" : ""} button is-secondary is-pulled-right`}
          onClick={this.logout.bind(this)}>Logout</button> :
          <button className={`${this.props.app.loading ? "is-loading" : ""} button is-primary is-pulled-right`}
          onClick={this.login.bind(this)}
          disabled={this.props.app.loading}>Login</button>
        }
        <h1 className="title is-3">
          Todos&nbsp;
          <span className={`icon is-medium has-text-primary ${_.size(this.props.todos) - _.size(_.filter(this.props.todos, e => e.done == true)) > 0 ? "is-hidden has-text-primary" : ""}`}>
            <i className="fa fa-check"></i>
          </span>
          <span className={`chart ${_.size(this.props.todos) - _.size(_.filter(this.props.todos, e => e.done == true)) == 0 ? "is-hidden" : ""}`}>
            <PieChart
              slices={[
                { color: '#00d1b2', value: _.size(_.filter(this.props.todos, e => e.done == true)) },
                { color: '#f0f0f0', value: _.size(this.props.todos) - _.size(_.filter(this.props.todos, e => e.done == true)) },
              ]}
            />
          </span>
        </h1>
        <form onSubmit={this.handleFormSubmit.bind(this)} className="form-inline">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                placeholder="Add a todo"
                value={this.state.todo.name}
                onChange={this.handleInputChange.bind(this)}
                disabled={!this.props.user || this.props.app.loading} />
            </div>
            <div className="control">
              <button
              action="submit"
              className="button is-primary"
              disabled={!this.props.user || this.props.app.loading}
              >Create Todo</button>
            </div>
          </div>
        </form>
        <ul className="panel">
          <ReactCSSTransitionGroup {...transitionOptions}>
            {this.renderTodos()}
          </ReactCSSTransitionGroup>
        </ul>
        {!this.props.user && !this.props.app.loading ?
          <h4 className="title is-6">Please log in.</h4> :
          <span></span>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos, user: state.user, app: state.app };
}

export default connect(mapStateToProps, actions)(App)
