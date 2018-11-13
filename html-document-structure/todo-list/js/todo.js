'use strict';

class TodoList {
  constructor(container) {
    if (!(container instanceof Element)) {
      return;
    }

    this.container = container;
    this.doneList = this.container.querySelector('.done');
    this.todoList = this.container.querySelector('.undone');
    
    this.container.addEventListener('change', this.handleChange.bind(this));

  }

  handleChange(event) {
    const target = event.target;

    if (target.tagName !== 'INPUT') {
      return;
    }

    this.toggle(target.parentNode, target.checked);
  }

  toggle(task, isDone) {
    const targetList = isDone ? this.doneList : this.todoList;
    targetList.appendChild(task);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoList(document.querySelector('.todo-list'));
});