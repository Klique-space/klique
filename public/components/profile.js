const template = document.createElement('template')
template.innerHTML = `
    <style>
        .profile {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: left;
            background-color: #2b2d42;
            border-radius: 1em;
            padding: 2em;
            margin: 2em;
        }
        .profile img {
            width: 7em;
            height: 7em;
            border-radius: 50%;
    </style>
    <div class="profile">
        <img alt="Profile Picture" class="profile-picture"/>
        <div class="info">
            <p><slot name="display-name" /></p>
        </div>
    </div>
`

class Profile extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content);
      this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

    }
  
    connectedCallback() {
    }
  }
  
  customElements.define("user-profile", Profile);
  