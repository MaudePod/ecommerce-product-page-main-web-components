export default class CartComponent extends HTMLElement {
    #internals;
    constructor() {
      super();
      this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
    }
    disconnectedCallback(){
    }
   
    static get observedAttributes() {
        return [
        ];
      }
}
if (!customElements.get("cart-component")) {
    customElements.define("cart-component", CartComponent);
  } 