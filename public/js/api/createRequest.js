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
  let argumentForOpen;
  let formData;
  let methodIsGet = false;

  if (method !== "GET") {
    argumentForOpen = url;
    formData = new FormData();
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  } else {
    methodIsGet = true;
    argumentForOpen = "";
    argumentForOpen = options.url + "?";
    for (let key in options.data) {
      argumentForOpen = argumentForOpen + key + "=" + options.data[key] + "&";
    }
    argumentForOpen = argumentForOpen.slice(0, -1);
  }

  try {
    xhr.open(method, argumentForOpen);
    if (methodIsGet) {
      xhr.send();
    } else {
      xhr.send(formData);
    }
  } catch (err) {
    throw err;
  }

  xhr.addEventListener("load", (response, err) => {
    options.callback(
      response.currentTarget.response,
      new Error(response.currentTarget.response.error)
    );
  });
};
