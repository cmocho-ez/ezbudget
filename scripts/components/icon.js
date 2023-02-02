import iconLib from '../icon-lib.js';

export default class ezIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'color', 'size', 'title'];
  }

  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `<svg class="${this.getAttribute('class')}" xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24" style="width: 24px; height: 24px"><title></title><path d="" /></svg>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));

    if (this.getAttribute('icon')) this.Update('icon', this.getAttribute('icon'));
    if (this.getAttribute('title')) this.Update('title', this.getAttribute('title'));
    if (this.getAttribute('color')) this.Update('color', this.getAttribute('color'));
    if (this.getAttribute('size')) this.Update('size', this.getAttribute('size'));
  }

  Update(name, newValue) {
    const svg = this.shadowRoot.querySelector('svg');
    const path = this.shadowRoot.querySelector('path');

    switch (name) {
      case 'icon':
        path.setAttribute('d', iconLib[newValue]);
        break;
      case 'title':
        svg.querySelector('title').innerHTML = newValue;
        break;
      case 'color':
        path.setAttribute('fill', newValue);
        break;
      case 'size':
        svg.style.width = newValue;
        svg.style.height = newValue;
        break;
    }
  }

  attributeChangedCallback(name, _old, newValue) {
    this.Update(name, newValue);
  }
}
