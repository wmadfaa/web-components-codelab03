import { LitElement, html, property, customElement } from "lit-element";

const API = "https://api.openbrewerydb.org/breweries";

@customElement("brewery-detail")
export class BreweryDetail extends LitElement {
  @property({ type: String })
  name: string;
  @property({ type: String })
  type: string;
  @property({ type: String })
  city: string;
  @property({ type: Boolean })
  visited: boolean = false;

  render() {
    return html`
      <h3>${this.name} (${this.visited ? "visited" : "not-visited"})</h3>
      <p>brewery type: ${this.type}</p>
      <p>city: ${this.city}</p>
      <button type="button" @click="${this._toggleVisitedStatus}">
        ${this.visited ? "visited" : "not-visited"}
      </button>
    `;
  }

  _toggleVisitedStatus() {
    this.visited = !this.visited;
  }
}

@customElement("my-element")
export default class MyElement extends LitElement {
  @property({ type: Array })
  breweries: any[];

  @property({ type: Boolean })
  loading = true;

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries) {
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
    return html`
      <h1>Breweries App</h1>

      <h2>Breweries</h2>

      <ul>
        ${this.breweries.map(
          (brewery) =>
            html`<li>
              <brewery-detail
                .name="${brewery.name}"
                .type="${brewery.brewery_type}"
                .city="${brewery.city}"
              ></brewery-detail>
            </li> `
        )}
      </ul>
    `;
  }
}
