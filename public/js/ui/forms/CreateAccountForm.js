/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */

  onSubmit(data) {
    Account.create(data, (response, err) => {
      if (response && response.success) {
        let thisModal = App.getModal('createAccount');
        thisModal.close();
        App.update();
        thisModal.element.querySelector('.form').reset();
      } else throw response.error
    });

  }
}