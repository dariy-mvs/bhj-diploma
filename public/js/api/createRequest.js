/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log(options);
  let xhr = new XMLHttpRequest();
  const method = options.method;
  xhr.responseType = options.responseType;
  const url = options.url;
  const login = options.data.email;
  const password = options.data.password;
  options.withCredentials = true;
  options.callback = f => f;
  
  if (method !== 'GET') {
    let formData = new FormData;
    formData.append( 'email', login );
    formData.append( 'password', password );
    try {
    xhr.open( method, url );
    xhr.send( formData );
    xhr.addEventListener('load', (response, err) => {options.callback(response, err)});
    } catch (e) {
      xhr.addEventListener('load', (e) => {options.callback(e)});
    }
  
  } else {
    try {
    xhr.open(method, `${url}?mail=${login}&password=${password}`);
    xhr.send();
    xhr.addEventListener('load', (response, err) => {options.callback(response, err)});
    } catch(e) {
      xhr.addEventListener('load', (err) => {options.callback(err)});
    }
  }
  
};
