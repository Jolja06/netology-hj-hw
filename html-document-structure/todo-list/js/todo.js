'use strict';

class TodoList {
  constructor(list) {
    if (!(list instanceof Element)) {
      return;
    }

    this.list = list;
    
    this.list.addEventListener('change', (event) => this.handleChange(event.target));

  }

  handleChange(target) {
    target.checked ? this.handleDone(target) : this.handleUndone(target);
  }

  handleUndone(task) {
    const undone = this.list.querySelector('.undone');
    undone.appendChild(task.parentNode);
  }

  handleDone(task) {
    const done = this.list.querySelector('.done');
    done.appendChild(task.parentNode);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoList(document.querySelector('.todo-list'));
});