function Initialize() {
  const rowButtons = `
    <ez-floatingbutton class="danger" name="btnDelete" size="0.6rem" icon="delete-forever"></ez-floatingbutton>
    <ez-floatingbutton name="btnMoveUp" size="0.6rem" icon="chevron-up" ></ez-floatingbutton>
    <ez-floatingbutton name="btnMoveDown" size="0.6rem" icon="chevron-down" ></ez-floatingbutton>`;

  const emptyRow = span => {
    const $tr = document.createElement('tr');
    $tr.classList.add('no-rows');
    $tr.innerHTML = `<td colspan="${span}">No rows to show, create new ones</td>`;

    return $tr;
  };

  let $tableInFocus = null;
  let $currentTab = document.querySelector('footer li.active');

  function handleModeToggler() {
    const $btn = document.querySelector('[name="btnModeToggle"]');
    const $link = document.querySelector('link[name="mode"]');

    $btn.addEventListener('click', e => {
      if ($link.href.indexOf('light') > 0) {
        $link.href = 'styles/darkmode.css';
      } else {
        $link.href = 'styles/lightmode.css';
      }
    });
  }

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
    const $body = $table.querySelector('tbody');
    const $newRow = document.createElement('tr');

    $newRow.innerHTML = newRowTemplate;
    $body.appendChild(emptyRow($newRow.childElementCount));

    $btn.addEventListener('click', () => {
      if ($body.querySelector('tr.no-rows')) $body.querySelector('tr.no-rows').remove();
      $body.appendChild($newRow.cloneNode(true));
    });
  }

  function handleNewIncome() {
    const $btn = document.querySelector('[name="btnNewIncome"]');
    const $table = document.querySelector('[name="tableIncome"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewRecurring() {
    const $btn = document.querySelector('[name="btnNewRecurringExpense"]');
    const $table = document.querySelector('[name="tableRecurringExpenses"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewInstallment() {
    const $btn = document.querySelector('[name="btnNewInstallment"]');
    const $table = document.querySelector('[name="tableInstallments"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

    bindTableAndButton($table, $btn, template);
  }

  function handleNewExtra() {
    const $btn = document.querySelector('[name="btnNewCasualExpense"]');
    const $table = document.querySelector('[name="tableCasualExpenses"]');
    const template = `<td></td><td></td><td></td><td></td><td></td><td></td><td>${rowButtons}</td>`;

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

  function handleTabs() {
    const $tabs = document.querySelector('footer ul');

    function setFocusEvent(target) {
      if (target) {
        $currentTab?.classList?.remove('active');
        $currentTab = target;
        $currentTab.classList.add('active');
      }
    }

    $tabs.addEventListener('click', e => {
      let $tab = e.target;
      if ($tab.nodeName !== 'LI') $tab = e.target.closest('li');

      setFocusEvent($tab);
    });
  }

  function handleCopy() {
    const $btn = document.querySelector('[name="btnCopy"]');

    $btn.addEventListener('click', () => {
      const ww = document.createElement('ez-workingwidget');
      document.body.appendChild(ww);
    });
  }

  function handleCardsClick() {
    const btnOpen = document.createElement('ez-floatingbutton');
    btnOpen.setAttribute('label', 'Open');
    btnOpen.setAttribute('name', 'btnOpen');
    btnOpen.classList.add('primary');
    btnOpen.classList.add('full-length');

    const btnEdit = document.createElement('ez-floatingbutton');
    btnEdit.setAttribute('label', 'Edit');
    btnEdit.setAttribute('name', 'btnEdit');
    btnEdit.classList.add('full-length');

    const btnRemove = document.createElement('ez-floatingbutton');
    btnRemove.setAttribute('label', 'Remove');
    btnRemove.setAttribute('name', 'btnRemove');
    btnRemove.classList.add('danger');
    btnRemove.classList.add('full-length');

    const buttons = [btnOpen, btnEdit, btnRemove];

    document.querySelectorAll('ez-card').forEach(el => {
      el.SetButtons(buttons);
      el.addEventListener('cta-click', e => {
        alert(e.detail.button.getAttribute('name'));
      });
    });
  }

  function setMonthTab() {
    const $tabs = document.querySelector('footer ul');
    const month = new Date().getMonth() + 1;

    $tabs.querySelector(`li:nth-child(${month})`).click();
  }

  /**
   *
   * @param {object} params Same parameters of fetch
   * @returns JSON Object
   */
  async function ajax(params) {
    try {
      const rawData = await fetch(params);
      const data = await rawData.json();

      return data;
    } catch (err) {
      alert(err.message);
    }
  }

  handleYear();
  handleTableEvents();
  handleTabs();
  handleCopy();
  handleModeToggler();
  handleCardsClick();

  setMonthTab();
}

Initialize();
