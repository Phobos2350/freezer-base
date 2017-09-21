import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './task-item.css';


export class TaskItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false};

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({editing: true});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove() {
    this.props.removeTask(this.props.task);
  }

  save(event) {
    if (this.state.editing) {
      const { task } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== task.title) {
        this.props.updateTask(task, {title});
      }

      this.stopEditing();
    }
  }

  saveClick(event) {
    if (this.state.editing) {
      const { task } = this.props;
      const title = this.textInput.value.trim();

      if (title.length && title !== task.title) {
        this.props.updateTask(task, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  incrQty = () => {
    const { task } = this.props;
    const currQty = task.qty;
    this.props.updateTask(task, {qty: currQty+1})
  }

  decrQty = () => {
    const { task } = this.props;
    const currQty = task.qty;
    if (currQty >= 1) this.props.updateTask(task, {qty: currQty-1})
  }

  changeFzr = () => {
    const { task } = this.props;
    this.props.updateTask(task, {freezer: !task.freezer})
  }

  changeDrw = () => {
    const { task } = this.props;
    const currDrawer = task.drawer;
    if (currDrawer >= 7) { this.props.updateTask(task, {drawer: 1}) }
    else { this.props.updateTask(task, {drawer: currDrawer+1}) }
  }

  toggleStatus() {
    const { task } = this.props;
    this.props.updateTask(task, {basket: !task.basket});
  }

  renderTitle(task) {
    return (
      <div className="task-item__title" tabIndex="0">
        {task.title}
      </div>
    );
  }

  renderQty(task) {
    return (
      <div className={classNames('task-item__qty', {'empty': task.qty === 0})}>
        x{task.qty}
      </div>
    );
  }

  renderFreezer(task) {
    if (task.freezer) {
      return (
        <Button 
          className={classNames('freezer--icon', 'task-item__button', 'task-item__info')}
          onClick={this.changeFzr} >
          <Icon name="home" />
        </Button>
      );
    }
    else if (!task.freezer) {
      return (
        <Button 
          className={classNames('freezer--icon', 'task-item__button', 'task-item__info')}
          onClick={this.changeFzr}>
          <Icon name="directions_car" />
        </Button>
      );
    }
  }

  renderDrawer(task) {
    return (
      <Button 
        className={classNames('info--icon', 'task-item__button', 'task-item__info')}
        onClick={this.changeDrw}>
        {task.drawer}
      </Button>
    );
  }

  renderTitleInput(task) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="task-item__input"
        defaultValue={task.title}
        maxLength="64"
        onKeyUp={this.handleKeyUp}
        type="text"
        ref={(input) => { this.textInput = input; }}
      />
    );
  }

  render() {
    const { editing } = this.state;
    const { task } = this.props;

    let containerClasses = classNames('task-item', {
      'task-item--basket': task.basket,
      'task-item--freezer': task.freezer,
      'task-item--drawer': task.drawer,
      'task-item--editing': editing
    });

    return (
      <div className={containerClasses} tabIndex="0">

        <div className="cell" onClick={this.edit}>
          {editing ? this.renderTitleInput(task) : this.renderTitle(task)}
        </div>

        <div className="cell">
          {this.renderFreezer(task)}
        </div>

        <div className="cell">
          {this.renderDrawer(task)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': !editing})}
            onClick={this.decrQty}>
            <Icon name="remove" />
          </Button>
        </div>

        <div className="cell">
          {this.renderQty(task)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': !editing})}
            onClick={this.incrQty}>
            <Icon name="add" />
          </Button>
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'task-item__button', 'btn--save', {'hide': !editing})}
            onClick={(e) => this.saveClick(e)}>
            <Icon name="done" />
          </Button>
          <Button
            className={classNames('btn--icon', 'task-item__button', 'btn--stop', {'hide': !editing})}
            onClick={this.stopEditing}>
            <Icon name="clear" />
          </Button>
          <Button
            className={classNames('btn--icon', 'task-item__button', {'active': task.basket, 'hide': editing})}
            onClick={this.toggleStatus}>
            <Icon name="shopping_basket" />
          </Button>
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired
};


export default TaskItem;
