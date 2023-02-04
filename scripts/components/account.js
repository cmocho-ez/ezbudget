export default class ezAccount extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'main', 'total'];
  }

  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `
    <link rel="stylesheet" href="styles/account.css" />
    <div class="ez-account" part="account">
      <span class="acc-name"></span>
      <span class="acc-total"></span>
    </div>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));

    if (this.getAttribute('label')) this.Update('label', this.getAttribute('label'));
    if (this.getAttribute('main')) this.Update('main', this.getAttribute('main'));
    if (this.getAttribute('total')) this.Update('total', this.getAttribute('total'));
  }

  Update(name, newValue) {
    const label = this.shadowRoot.querySelector('.acc-name');
    const total = this.shadowRoot.querySelector('.acc-total');

    switch (name) {
      case 'label':
        label.textContent = newValue;
        break;
      case 'main':
        this.shadowRoot.querySelector('.ez-account').classList.add('main');
        break;
      case 'total':
        total.textContent = newValue;
        break;
    }
  }

  attributeChangedCallback(name, _old, newValue) {
    this.Update(name, newValue);
  }
}
