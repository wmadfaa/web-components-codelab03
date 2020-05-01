import { LitElement, html, css } from "lit-element";

export default class MyCounter extends LitElement {
  count = 0;

  static properties = {
    count: { type: Number }
  };

  constructor() {
    super();
    this.count = 0;
  }

  static get styles() {
    return css`
      * {
        font-size: 200%;
      }

      span {
        width: 4rem;
        display: inline-block;
        text-align: center;
      }

      button {
        width: 4rem;
        height: 4rem;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
      }
    `;
  }

  inc() {
    this.count++;
  }

  dec() {
    this.count--;
  }

  render() {
    return html`
      <button @click="${this.dec}">-</button>
      <span>${this.count}</span>
      <button @click="${this.inc}">+</button>
    `;
  }
}

customElements.define("my-counter", MyCounter);
