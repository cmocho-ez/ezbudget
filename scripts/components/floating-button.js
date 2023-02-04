export default class ezFloatButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'color', 'size', 'title', 'icon', 'icon-color', 'class'];
  }

  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `<link rel="stylesheet" href="styles/button.css" />
                          <button class="ez-floating-button">
                            <ez-icon></ez-icon>
                            <span></span>
                          </button>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));

    if (this.getAttribute('class')) this.Update('class', this.getAttribute('class'));
    if (this.getAttribute('label')) this.Update('label', this.getAttribute('label'));
    if (this.getAttribute('title')) this.Update('title', this.getAttribute('title'));
    if (this.getAttribute('color')) this.Update('color', this.getAttribute('color'));
    if (this.getAttribute('size')) this.Update('size', this.getAttribute('size'));
    if (this.getAttribute('icon')) this.Update('icon', this.getAttribute('icon'));
    if (this.getAttribute('icon-color')) this.Update('icon-color', this.getAttribute('icon-color'));
  }

  Update(name, newValue) {
    const button = this.shadowRoot.querySelector('button');
    const icon = this.shadowRoot.querySelector('ez-icon');
    const span = this.shadowRoot.querySelector('span');

    switch (name) {
      case 'class':
        button.setAttribute('class', `ez-floating-button ${newValue}`);
        icon.setAttribute('class', newValue);
        break;
      case 'label':
        span.textContent = newValue;
        icon.style.display = 'none';
        break;
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
        span.style.display = 'none';
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
