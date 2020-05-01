import { LitElement, html, property, customElement } from "lit-element";

const API = "https://api.openbrewerydb.org/breweries";

@customElement("my-element")
export default class MyElement extends LitElement {
  @property({ type: Array })
  breweries = [];

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries.length) {
      this._fetchBreweries();
    }
  }

  async _fetchBreweries() {
    const res = await fetch(API);
    const jsonRes = await res.json();
    this.breweries = jsonRes;
  }

  render() {
    return html` <pre>${JSON.stringify(this.breweries, null, 2)}</pre> `;
  }
}
