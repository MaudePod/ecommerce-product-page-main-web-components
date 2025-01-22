import DrawerComponent from "./DrawerComponent.js";
import CartComponent from "./CartComponent.js";
export default class NavigationComponent extends HTMLElement {
  #internals;
  constructor() {
    super();
    this.#internals = this.attachInternals();
  }
  connectedCallback(
  ) {
  }
  disconnectedCallback() {
  }

  static get observedAttributes() {
    return [
    ];
  }
}
if (!customElements.get("cart-component")) {
  customElements.define("cart-component", NavigationComponent);
} 