/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  const method = options.method;
  xhr.responseType = options.responseType;
  const url = options.url;
  options.withCredentials = true;

  if (method !== "GET") {
    let formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    try {
      xhr.open(method, url);
      xhr.send(formData);
      xhr.addEventListener("load", (response, err) => {
        options.callback(
          response.currentTarget.response,
          response.currentTarget.response.error
        );
      });
    } catch (e) {
      xhr.addEventListener("load", (e) => {
        options.callback(e);
      });
    }
  } else {
    try {
      let stringForRequest = "";
      stringForRequest = options.url + "?";
      for (let key in options.data) {
        stringForRequest =
          stringForRequest + key + "=" + options.data[key] + "&";
      }
      stringForRequest = stringForRequest.slice(0, -1);
      xhr.open(method, stringForRequest);
      xhr.send();
      xhr.addEventListener("load", (response, err) => {
        options.callback(response.currentTarget.response, err);
      });
    } catch (e) {
      xhr.addEventListener("load", (err) => {
        options.callback(err);
      });
    }
  }
};
