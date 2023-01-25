function Initialize() {
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

  function handleNewIncome() {
    const $btn = document.querySelector('[name="btnNewIncome"]');
    const $tableIncome = document.querySelector('[name="tableIncome"]');

    $btn.addEventListener('click', () => {
      const $newRow = document.createElement('tr');

      $newRow.innerHTML = `<td></td><td></td><td></td><td></td><td></td><td>&nbsp;</td>`;
      $tableIncome.querySelector('tbody').appendChild($newRow);
    });
  }

  function handleTableEvents() {
    const $tables = document.querySelectorAll('table');

    function setFocusEvent(e) {
      $tableInFocus = this;
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
  handleNewIncome();
  handleTableEvents();
}

Initialize();
