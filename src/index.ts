import { LitElement, html, property, customElement } from "lit-element";

const API = "https://api.openbrewerydb.org/breweries";

@customElement("my-element")
export default class MyElement extends LitElement {
  @property({ type: Array })
  breweries = [];

  @property({ type: Boolean })
  loading = true;

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries.length) {
      this._fetchBreweries();
    }
  }

  async _fetchBreweries() {
    this.loading = true;
    // await new Promise((res) => setTimeout(res, 1000)); // uncomment to test loading state
    const res = await fetch(API);
    const jsonRes = await res.json();
    this.breweries = jsonRes;
    this.loading = false;
  }

  render() {
    if (this.loading) return html`<p>loading...</p>`;
    return html` <pre>${JSON.stringify(this.breweries, null, 2)}</pre> `;
  }
}
