/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw Error("Передан пустой элемент!");
    }
    (this.element = element), this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element
      .querySelector(".remove-account")
      .addEventListener("click", () => {
        this.removeAccount();
      });

    [...this.element.querySelectorAll(".transaction__remove")].forEach((el) =>
      el.addEventListener("click", (event) => {
        let target = event.target.closest(".transaction__remove");
        this.removeTransaction(target.dataset.id);
      })
    );
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) return;
    let confirmationDelete = confirm(
      "Вы действительно хотите удалить этот счёт?"
    );
    if (confirmationDelete) {
      let objectForRemove = { id: this.lastOptions.account_id };
      Account.remove(objectForRemove, (response) => {
        if (response.success) {
          App.updateWidgets();
          this.clear();
        } else throw response.error;
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    let confirmationDelete = confirm(
      "Вы действительно хотите удалить эту транзакцию?"
    );

    if (confirmationDelete) {
      Transaction.remove({ id: id }, (response) => {
        if (response.success) {
          App.update();
        } else throw response.error;
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, (response, err) => {
        if (response.success) {
          this.renderTitle(options.name);
        }
      });
      Transaction.list(options, (response, err) => {
        if (response.success) {
          this.renderTransactions(response.data);
        }
      });
    } else return;
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let thisDateAndTime = date.replace("T", " ").split(" ");
    let thisDate = thisDateAndTime[0].split("-").map((el) => (el = +el));
    let thisTime = thisDateAndTime[1].split("").slice(0, 5).join("");
    let formatMonth = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${thisDate[2]} ${formatMonth[thisDate[1] - 1]} ${
      thisDate[0]
    }г. в ${thisTime}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(
            item.created_at
          )}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    this.element.querySelector(".content").innerHTML = "";
    data.forEach((el) => {
      let itemHTML = this.getTransactionHTML(el);
      this.element.querySelector(".content").innerHTML += itemHTML;
    });
    this.registerEvents();
  }
}
