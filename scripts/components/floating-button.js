export default class ezFloatButton extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size', 'title', 'icon', 'icon-color'];
  }

  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `<link rel="stylesheet" href="styles/button.css"></link><button class="ez-floating-button ${this.getAttribute(
      'class'
    )}"><ez-icon class="${this.getAttribute('class')}"></ez-icon></button>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));

    if (this.getAttribute('title')) this.Update('title', this.getAttribute('title'));
    if (this.getAttribute('color')) this.Update('color', this.getAttribute('color'));
    if (this.getAttribute('size')) this.Update('size', this.getAttribute('size'));
    if (this.getAttribute('icon')) this.Update('icon', this.getAttribute('icon'));
    if (this.getAttribute('icon-color')) this.Update('icon-color', this.getAttribute('icon-color'));
  }

  Update(name, newValue) {
    const button = this.shadowRoot.querySelector('button');
    const icon = this.shadowRoot.querySelector('ez-icon');

    switch (name) {
      case 'title':
        button.setAttribute('title', newValue);
        icon.setAttribute('title', newValue);
        break;
      case 'color':
        button.style.backgroundColor = newValue;
        break;
      case 'size':
        button.style.width = 'calc(14px + ' + newValue + ')';
        button.style.height = button.style.width;
        icon.setAttribute('size', 'calc(6px + ' + newValue + ')');
        break;
      case 'icon':
        icon.setAttribute('icon', newValue);
        break;
      case 'icon-color':
        icon.setAttribute('color', newValue);
        break;
    }
  }

  attributeChangedCallback(name, _old, newValue) {
    this.Update(name, newValue);
  }
}
