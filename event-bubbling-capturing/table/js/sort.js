'use strict';
let isSorted = false;
function handleTableClick(event) {
  const target = event.target;
  if (target.dataset.propName) {
    target.dataset.dir = !(isSorted) ? -1 : 1;
    isSorted = !isSorted;
  }
  target.closest('table').dataset.sortBy = target.dataset.propName;

  sortTable(target.dataset.propName, target.dataset.dir);
}
