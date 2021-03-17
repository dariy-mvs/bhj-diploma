"use strict";

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
var createRequest = function createRequest() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var xhr = new XMLHttpRequest();
  var method = options.method;
  console.log("method: ".concat(method));
  var url = options.url;
  console.log("url: ".concat(url));
  var login = options.data.email;
  console.log("login: ".concat(login));
  var password = options.data.password;

  if (method !== 'GET') {
    var formData = new FormData();
    formData.append('mail', login);
    formData.append('password', password);

    try {
      xhr.open(method, url);
      xhr.send(formData);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      xhr.open(method, url, true, login, password);
      xhr.send();
    } catch (e) {
      console.log(e);
    }
  }

  xhr.addEventListener('load', options.callback);
};

createRequest({
  url: 'https://example.com',
  // адрес
  headers: {
    // произвольные заголовки, могут отсутствовать
    'Content-type': 'application/json'
  },
  data: {
    // произвольные данные, могут отсутствовать
    email: 'ivan@poselok.ru',
    password: 'odinodin'
  },
  responseType: 'json',
  // формат, в котором необходимо выдать результат
  method: 'GET',
  // метод запроса

  /*
    Функция, которая сработает после запроса.
    Если в процессе запроса произойдёт ошибка, её объект
    должен быть в параметре err.
    Если в запросе есть данные, они должны быть переданы в response.
  */
  callback: function callback(err, response) {
    console.log('Ошибка, если есть', err);
    console.log('Данные, если нет ошибки', response);
  }
});