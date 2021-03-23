/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let thisUser = User.current();
    Account.list(thisUser, (response, err) => {
      if (response.success) {
        let accountId;
        let accountName;
        let stringHTMLforSelect = "";
        response.data.forEach((el) => {
          accountName = el.name;
          accountId = el.id;
          stringHTMLforSelect += `<option value="${accountId}">${accountName}</option>`;
        });
        this.element.querySelector(
          ".accounts-select"
        ).innerHTML = stringHTMLforSelect;
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (response, err) => {
      if (response.success) {
        this.element.reset();
        let thisClosest = this.element.closest(".modal");
        let thisModal = App.getModal(thisClosest.dataset.modalId);
        thisModal.close();
        App.update();
      }
    });
  }
}
