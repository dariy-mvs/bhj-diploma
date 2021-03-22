/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  
    static URL = '/account'
  
  static get(id, callback = f => f){
    const options = {
      url: this.URL + `/${id}`,
      responseType: 'json',
      method: 'GET', 
      callback
    };
    return createRequest(options);
  }
}
