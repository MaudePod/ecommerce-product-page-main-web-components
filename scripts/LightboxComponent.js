export default class LightboxComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        this.#internals.shadowRoot.querySelector('button[id="close"]').addEventListener('click', this.onCloseButtonClicked);
    }
    disconnectedCallback() {
    }
    onCloseButtonClicked = () => window.dispatchEvent(new CustomEvent("close clicked", {}));
    static get observedAttributes() {
        return [
        ];
    }
}
if (!customElements.get("lightbox-component")) {
    customElements.define("lightbox-component", LightboxComponent);
}