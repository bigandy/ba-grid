import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A Grid Component.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('ba-grid')
export class BAGrid extends LitElement {
  constructor() {
    super();

    // this.showNumbers = false;
  }

  static get properties() {
    return {
      showNumbers: { type: Boolean },
      showControls: { type: Boolean },
      // data: { attribute: false },
      // items: {},
      columns: { type: Number },
    };
  }

  render() {
    return html`
      <div style="--columns: ${this.columns}">
        ${[...new Array(this.columns)].map((_, index) => {
          return html`<div>${
            this.showNumbers ? index + 1 : html`&nbsp;`
          }</div>`;
        })}
      </div>
    `;
  }

  static styles = css`
    :host > div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(var(--columns, 30), 1fr);
      gap: var(--gap);
      
    }

    :host > div > div {
      background: rgb(255 0 255 / 0.05);
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ba-grid': BAGrid;
  }
}
