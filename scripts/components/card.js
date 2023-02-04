export default class ezCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'image', 'cta-label'];
  }

  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `
    <link rel="stylesheet" href="styles/card.css" />
    <div class="ez-card">
      <section name="image" style="display: none">
      </section>
      <header></header>
      <section name="body">
        <slot></slot>
      </section>
      <section name="footer">
        <ez-floatingbutton class="primary full-length" name="btnClose"></ez-floatingbutton>
      </section>
    </div>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));

    if (this.getAttribute('title')) this.Update('title', this.getAttribute('title'));
    if (this.getAttribute('image')) this.Update('image', this.getAttribute('image'));
    if (this.getAttribute('cta-label')) this.Update('cta-label', this.getAttribute('cta-label'));

    const cta = this.shadowRoot.querySelector('section[name=footer]');

    cta.addEventListener('click', e => {
      if (e.target.nodeName === 'EZ-FLOATINGBUTTON') {
        const eventCtaClick = new CustomEvent('cta-click', {
          ...e,
          bubbles: true,
          composed: true,
          detail: {
            button: e.target,
          },
        });
        e.target.dispatchEvent(eventCtaClick);
      }
    });
  }

  Update(name, newValue) {
    const button = this.shadowRoot.querySelector('ez-floatingbutton');
    const header = this.shadowRoot.querySelector('header');
    const image = this.shadowRoot.querySelector('section[name="image"]');

    switch (name) {
      case 'title':
        this.removeAttribute('title');
        header.textContent = newValue;
        break;
      case 'image':
        image.style.backgroundImage = `url(${newValue})`;
        image.style.display = 'block';
        break;
      case 'cta-label':
        button.setAttribute('label', newValue);
        break;
    }
  }

  attributeChangedCallback(name, _old, newValue) {
    this.Update(name, newValue);
  }

  AddButton(button) {
    this.shadowRoot.querySelector('section[name=footer]').appendChild(button);
  }

  RemoveButton(button) {
    button.remove();
  }

  GetButtons() {
    return this.shadowRoot.querySelectorAll('ez-floatingbutton');
  }

  SetButtons(buttons) {
    this.shadowRoot.querySelectorAll('section[name=footer] ez-floatingbutton').forEach(el => el.remove());
    buttons.forEach(btn => {
      this.shadowRoot.querySelector('section[name=footer]').appendChild(btn.cloneNode(true));
    });
  }
}
