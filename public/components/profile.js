class Profile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
                <div>
                <style>
                    .profile {
                        display: flex;
                        flex-direction: column;
                        align-items: centre;
                        justify-content: center;
                        background-color: #2b2d42;
                        border-radius: 1em;
                        max-width: 175px;
                        padding: 2em;
                        margin: 2em;
                        text-align: center;
                    }
                    .profile img {
                        width: 7em;
                        height: 7em;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-bottom: 1rem;
                    }
                    .display-name {
                        text-align: center;
                    }
                    .skills {
                      color: #DEDEDE;
                      font-size: 0.8rem;
                    }
                    .kliq {
                      margin-top: 1em;
                      margin-bottom: -1em;
                      padding-top:0;
                      padding-bottom:0;
                      background-color: #F66879;
                      color: white;
                      border-radius: 1em;
                      width: 3em;
                      align-self: center;
                    }
                </style>
                <div class="profile">
                    <img alt="Profile Picture" src=${
                      this.hasAttribute("avatar")
                        ? this.getAttribute("avatar")
                        : "assets/blank_profile.jpg"
                    }>
                    <div class="info">
                        <p class="display-name">${
                          this.hasAttribute("display-name")
                            ? this.getAttribute("display-name")
                            : "Cool Panda"
                        }</p>
                        ${
                          this.hasAttribute("user-attributes")
                            ? this.getAttribute("user-attributes")
                                .split(";")
                                .reduce((accum, element) => {
                                  element = element.split(",");
                                  return (
                                    accum +
                                    `<p class="skills"><strong>${element[0]}<strong>: ${element[1]}</p>`
                                  );
                                }, "")
                            : "<p class='skills'>Nothing to show (yet!)</p>"
                        }
                    </div>
                    <button class="kliq">kliq!</button>
                </div>
            </div>
          `;
  }
}

customElements.define("user-profile", Profile);
