/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor() {
    super(URL);
    this.URL = '/account'
  }
  static get(id = '', callback = f => f){
    const options = {
      url: this.URL + `/${id}`,
      responseType: 'json',
      method: 'GET', 
      callback
    };
    return createRequest(options);
  }
}
