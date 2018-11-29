'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  commentsContainer.appendChild(
      list.reduce((f, item) => {
        f.appendChild(
			template(item)
        );
        return f;
      }, document.createDocumentFragment())
  )
}

function template(item) {
  const wrapper = document.createElement('div');
  const user = document.createElement('div');
  const avatar = document.createElement('div');
  const comment = document.createElement('div');
  const text = document.createElement('p');
  const footer = document.createElement('div');
  const data = document.createElement('div');
  const actions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');

  wrapper.className = 'comment-wrap';

  user.className = 'photo';
  user.setAttribute('title', `${item.author.name}`);

  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url(${item.author.pic})`;

  comment.className = 'comment-block';
  text.className = 'comment-text';
  text.innerText = `${item.text.split('\\n').join('<br>')}`;

  footer.className = 'bottom-comment';
  data.className = 'comment-date';
  data.innerText = `${new Date(item.date).toLocaleString('ru-Ru')}`;

  actions.className = 'comment-actions';

  complain.className = 'complain';
  complain.textContent = 'Пожаловаться';

  reply.className = 'reply';
  reply.textContent = 'Ответить';

  wrapper.appendChild(user);
  wrapper.appendChild(comment);

  user.appendChild(avatar);

  comment.appendChild(text);
  comment.appendChild(footer);

  footer.appendChild(data);
  footer.appendChild(actions);

  actions.appendChild(complain);
  actions.appendChild(reply);

  return wrapper;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
