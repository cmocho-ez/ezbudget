export default class ezWorkingWidget extends HTMLElement {
  constructor() {
    super();
    this.Render();
  }

  Render() {
    const template = document.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="styles/working-widget.css" />
      <div class="overlay"></div>
      <div class="ez-widget working">
        <ez-icon icon="cog" class="spin"><ez-icon>
        <span>Working on your request...</span>
      </div>`;

    this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });

    this.shadowRoot.append(template.content.cloneNode(true));
  }
}
