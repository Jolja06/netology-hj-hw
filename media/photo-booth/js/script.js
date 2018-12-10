'use strict';

class Photo {
  constructor(container) {
    if (!(container instanceof Element)) return;

    this.errorMessage = container.querySelector('#error-message');
    this.app = container.querySelector('.app');
    this.controls = container.querySelector('.controls');
    this.video = document.createElement('video');
    this.audio = document.createElement('audio');
    this.takePhoto = this.controls.querySelector('#take-photo');
    this.listImages = document.querySelector('.list');

    this.audio.src = './audio/click.mp3';
    this.init();
  }

  init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.errorMessage.textContent = 'Ваш браузер не поддерживает mediaDevices';
      this.errorMessage.style.display = 'block';
    }

    navigator.mediaDevices
      .getUserMedia({video: true, audio: false})
        .then(stream => {
          this.video.srcObject = stream;
          this.app.appendChild(this.video);
          this.video.play();

          this.controls.style.display = 'flex';

          this.takePhoto.addEventListener('click', () => this.handlePhoto(stream));

        })
        .catch(error => {
          this.errorMessage.textContent = `Нет доступа к камере. Ошибка ${error.name}`;
          this.errorMessage.style.display = 'block';
        });
  }

  handlePhoto(stream) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let imgTemplate;
    let dataUrl;

    ctx.drawImage(this.video, 0, 0);

    dataUrl = canvas.toDataURL('image/jpeg', 1.0);
    console.log(dataUrl);
    imgTemplate = this.template(dataUrl);

    imgTemplate.addEventListener('click', (event) => {
      switch(event.target.textContent) {
        case 'file_download':
          event.target.style.display = 'none';
          break;
        case 'file_upload':
          this.fetchRequest(dataUrl, event.target);
          break;
        case 'delete':
          imgTemplate.parentNode.removeChild(imgTemplate);
          break;
      }
    });

    this.listImages.appendChild(imgTemplate);
    this.audio.play();


  }

  template(url) {
    return this.elem('figure', {}, [
      this.elem('img', {src: url}),
      this.elem('figcaption', {}, [
        this.elem('a', {href: url, download: 'snapshot.png'}, [
          this.elem('i', {class: 'material-icons'}, 'file_download')
        ]),
        this.elem('a', {}, [
          this.elem('i', {class: 'material-icons'}, 'file_upload')
        ]),
        this.elem('a', {}, [
          this.elem('i', {class: 'material-icons'}, 'delete')
        ]),
      ])
    ])
  }

  elem(tagName, attrs, children) {
    const element = document.createElement(tagName);

    if (typeof attrs === 'object') {
      Object.keys(attrs).forEach(attr => element.setAttribute(attr, attrs[attr]));
    }

    if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof Array) {
      children.forEach(child => element.appendChild(child));
    }

    return element;
  }

  fetchRequest(imgData, target) {
    const data = new FormData();
    const blob = this.dataUrlToBlob(imgData);

    data.append('image', blob);

    fetch('https://neto-api.herokuapp.com/photo-booth', {
      body: data,
      credentials: 'same-origin',
      method: 'POST'
    })
      .then(result => {
        if (200 <= result.status && result.status < 300) {
          return result;
        }
        throw new Error(result.statusText);
      })
      .then(result => {
        console.log(result);
        target.style.display = 'none';
      });

  }

  dataUrlToBlob(url) {
    const mimeString = data.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    const byteString = atob(data.split(',')[1]);

    for(let i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: mimeString });
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Photo(document.querySelector('.container'));
});
