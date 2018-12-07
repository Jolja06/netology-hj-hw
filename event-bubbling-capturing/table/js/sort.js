'use strict';

function handleTableClick(event) {
  const target = event.target;

  if (target.tagName !== 'TH') {
    return;
  }

  const propName = target.dataset.propName;
  if (!propName) {
    return;
  }
  const dir = target.dataset.dir;
  const isSorted = !dir || dir === '-1' ? 1 : -1;
  target.dataset.dir = isSorted;
  target.closest('table').dataset.sortBy = propName;

  sortTable(propName, isSorted);
}
