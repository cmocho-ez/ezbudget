function Initialize() {
  const rowButtons = `
    <ez-floatingbutton name="btnDelete" size="0.6rem" icon="delete-forever" color="#7e1f1f" icon-color="#eee"></ez-floatingbutton>
    <ez-floatingbutton name="btnMoveUp" size="0.6rem" icon="chevron-up" ></ez-floatingbutton>
    <ez-floatingbutton name="btnMoveDown" size="0.6rem" icon="chevron-down" ></ez-floatingbutton>`;

  let $tableInFocus = null;

  function handleYear() {
    const $year = document.querySelector('[name="year"]');
    const min = $year.getAttribute('min') || '1990';
    const max = $year.getAttribute('max') || '2290';

    $year.value = new Date().getFullYear();
    $year.addEventListener('change', function (e) {
      if (Number(this.value) > Number(max)) this.value = max;
      if (Number(this.value) < Number(min)) this.value = min;
    });
  }

  function bindTableAndButton($table, $btn, newRowTemplate) {
    $btn.addEventListener('click', () => {
      const $newRow = document.createElement('tr');

      $newRow.innerHTML = newRowTemplate;
      $table.querySelector('tbody').appendChild($newRow);
    });
  }

  function handleNewIncome() {
    const $btn = document.querySelector('[name="btnNewIncome"]');
    const $table = document.querySelector('[name="tableIncome"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewRecurring() {
    const $btn = document.querySelector('[name="btnNewRecurringExpense"]');
    const $table = document.querySelector('[name="tableRecurringExpenses"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewInstallment() {
    const $btn = document.querySelector('[name="btnNewInstallment"]');
    const $table = document.querySelector('[name="tableInstallments"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewExtra() {
    const $btn = document.querySelector('[name="btnNewCasualExpense"]');
    const $table = document.querySelector('[name="tableCasualExpenses"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleTableEvents() {
    handleNewIncome();
    handleNewRecurring();
    handleNewInstallment();
    handleNewExtra();

    const $tables = document.querySelectorAll('table');

    function setFocusEvent(e) {
      $tableInFocus?.classList?.remove('focused');
      $tableInFocus = this;
      $tableInFocus.classList.add('focused');
    }

    function editCellEvent(e) {
      let $td = e.target;

      if ($td?.nodeName !== 'TD') $td = e.target.closest('td');
      if ($td?.nodeName !== 'TD') return;

      $td.innerText = 'here!';
    }

    function keyOnCellEvent(e) {}

    $tables.forEach($t => {
      $t.addEventListener('click', setFocusEvent);
      $t.addEventListener('dblclick', editCellEvent);
      $t.addEventListener('keypress', keyOnCellEvent);
    });
  }

  handleYear();
  handleTableEvents();
}

Initialize();
