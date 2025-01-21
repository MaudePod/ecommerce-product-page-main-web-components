export default class DrawerComponent extends HTMLElement {
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
if (!customElements.get("drawer-component")) {
    customElements.define("drawer-component", DrawerComponent);
  } 