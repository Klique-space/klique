class ComponentName extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
          <div>
            <h1>Hello World!</h1>
          </div>
        `;
  }
}

customElements.define("component-name", ComponentName);
