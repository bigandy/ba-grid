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
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Boolean })
  dialogOpen = false;
  // constructor() {
  //   super();
  //   this.dialogOpen = false;

  //   // this.showNumbers = false;
  // }

  static get properties() {
    return {
      showNumbers: { type: Boolean },
      showControls: { type: Boolean },
      // data: { attribute: false },
      // items: {},
      columns: { type: Number, reflect: true },
    };
  }

  private _handleClick = () => {
    this.dialogOpen = !this.dialogOpen;
  };

  private _closeDialog = () => {
    this.dialogOpen = false;
  };

  private _handleInputChange = (e) => {
    console.log(e.target.value);
    this.columns = Number(e.target.value);
  };

  render() {
    console.log(this.columns);
    return html`
      <div style="--columns: ${this.columns}">
        ${[...new Array(this.columns)].map((_, index) => {
          return html`<div>${
            this.showNumbers ? index + 1 : html`&nbsp;`
          }</div>`;
        })}

        ${
          this.showControls &&
          html`<button class="toggle" @click="${this._handleClick}">Toggle Dialog</button>`
        }

        ${
          this.showControls && this.dialogOpen
            ? html`<dialog open><p>Controls</p>
            Columns: ${this.columns}
            <input type="range" value="3" min="3" max="18" @change=${this._handleInputChange}/>
            
            <button @click="${this._closeDialog}">Close</button></dialog>`
            : null
        }
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

    .toggle {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    dialog {
      position: absolute;
      top: 3%;
      left: 0;
      width: 90%;
      height: 90%;
      border-width: 1px;
    }

    dialog button {
      position: absolute; 
      top: 1rem;
      right: 1rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ba-grid': BAGrid;
  }
}
