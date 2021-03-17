/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  const method = options.method;
  xhr.responseType = options.responseType;
  const url = options.url;
  const login = options.data.email;
  const password = options.data.password;
  
  if (method !== 'GET') {
  let formData = new FormData;
  formData.append( 'mail', login );
  formData.append( 'password', password );
  try {
  xhr.open( method, url );
  xhr.send( formData );
  xhr.addEventListener('load', (response) => {options.callback(response)});
  } catch (e) {
    xhr.addEventListener('load', (e) => {options.callback(e)});
  }
  
  } else {
    try {
    xhr.open(method, `${url}?mail=${login}&password=${password}`);
    xhr.send();
    xhr.addEventListener('load', (response) => {options.callback(response)});
    } catch(e) {
      xhr.addEventListener('load', (e) => {options.callback(e)});
    }
    
  }
  
};


  // try {
  //   xhr.setRequestHeader(options.headers)
  // } catch(e) {

  // }

// createRequest({
//   url: 'https://example.com', 
//   headers: { 
//     'Content-type': 'application/json' 
//   },
//   data: {
//     email: 'ivan@poselok.ru',
//     password: 'odinodin'
//   },
//   responseType: 'json',
//   method: 'GET', 
//   callback: (err, response) => {
//     console.log( 'Ошибка, если есть', err );
//     console.log( 'Данные, если нет ошибки', response );
//   }
// });