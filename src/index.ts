import { LitElement, html, property, customElement } from "lit-element";
import "https://unpkg.com/@material/mwc-button?module";

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
  visited: boolean;

  render() {
    return html`
      <h3>${this.name} (${this.visited ? "visited" : "not-visited"})</h3>
      <p>brewery type: ${this.type}</p>
      <p>city: ${this.city}</p>
      <mwc-button type="button" @click="${this._toggleVisitedStatus}">
        ${this.visited ? "visited" : "not-visited"}
      </mwc-button>
    `;
  }

  _toggleVisitedStatus() {
    this.dispatchEvent(new CustomEvent("toggle-brewery-visited"));
  }
}

@customElement("my-element")
export default class MyElement extends LitElement {
  @property({ type: Array })
  breweries: any[];

  @property({ type: Boolean })
  loading = true;

  @property({ type: String })
  filter: string;

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

  toggleBreweryVisited(breweryToUpdate) {
    this.breweries = this.breweries.map((brewery) => {
      if (brewery !== breweryToUpdate) {
        return brewery;
      }
      return { ...breweryToUpdate, visited: !breweryToUpdate.visited };
    });
  }

  _filterNone() {
    this.filter = "all";
  }
  _filterVisited() {
    this.filter = "visited";
  }
  _filterNotVisited() {
    this.filter = "notVisited";
  }

  render() {
    if (this.loading) return html`<p>loading...</p>`;

    const totalVisited = this.breweries.filter((b) => b.visited).length;
    const totalNotVisited = this.breweries.length - totalVisited;

    const breweries = this.breweries.filter((brewery) => {
      if (this.filter === "visited") return brewery.visited;
      if (this.filter === "notVisited") return !brewery.visited;
      return brewery;
    });

    return html`
      <h1>Breweries App</h1>

      <h2>Breweries</h2>
      <p>(${totalVisited} visited and ${totalNotVisited} still to go)</p>

      <mwc-button @click=${this._filterNone}>Filter none</mwc-button>
      <mwc-button @click=${this._filterVisited}>Filter visited</mwc-button>
      <mwc-button @click=${this._filterNotVisited}
        >Filter not-visited</mwc-button
      >

      <ul>
        ${breweries.map(
          (brewery) =>
            html`<li>
              <brewery-detail
                .name="${brewery.name}"
                .type="${brewery.brewery_type}"
                .city="${brewery.city}"
                .visited="${brewery.visited}"
                @toggle-brewery-visited="${() =>
                  this.toggleBreweryVisited(brewery)}"
              ></brewery-detail>
            </li> `
        )}
      </ul>
    `;
  }
}
