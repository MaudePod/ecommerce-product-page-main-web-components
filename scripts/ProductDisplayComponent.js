export default class ProductDisplayComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        this.#internals.shadowRoot.querySelector('button[class="plus"]').addEventListener('click', this.onPlusButtonClicked);
        this.#internals.shadowRoot.querySelector('button[class="minus"]').addEventListener('click', this.onMinusButtonClicked);
        this.#internals.shadowRoot.querySelector('button[id="add-to-cart"]').addEventListener('click', this.onAddToCartClicked);
        this.#internals.shadowRoot.querySelector('section[id="lightbox"]').popover="manual";
        const productName = this.#internals.shadowRoot.querySelector('section[class="right"] h1').innerHTML;
        if(localStorage.getItem(productName)){
            let val = JSON.parse(localStorage.getItem(productName));
            this.updateQtyDisplay(val.quantity);
        }
        window.addEventListener('close clicked', (event) => {
            this.#internals.shadowRoot.querySelector('section[id="lightbox"]').hidePopover();
        });
    }
    disconnectedCallback() {
    }
    onPlusButtonClicked = (updateQtyDisplay) => {
        const productName = this.#internals.shadowRoot.querySelector('section[class="right"] h1').innerHTML;
        const price = Number(this.#internals.shadowRoot.querySelector('section[class="current-price"]').innerHTML.replace("$", ""));
        if (localStorage.getItem(productName)) {
            let val = JSON.parse(localStorage.getItem(productName));
            const updatedTotal = Number(val.quantity) + 1;
            localStorage.setItem(productName, `{"quantity":"${updatedTotal}","price":"${price}"}`);
            this.updateQtyDisplay(updatedTotal);
        } else {
            localStorage.setItem(productName, `{"quantity":"${1}","price":"${price}"}`);
            this.updateQtyDisplay(1);
        }

    }
    onMinusButtonClicked = (updateQtyDisplay) => {
        const productName = this.#internals.shadowRoot.querySelector('section[class="right"] h1').innerHTML;
        const price = Number(this.#internals.shadowRoot.querySelector('section[class="current-price"]').innerHTML.replace("$", ""));
        if (localStorage.getItem(productName)) {
            let val = JSON.parse(localStorage.getItem(productName));
            const updatedTotal = Number(val.quantity) - 1;
            localStorage.setItem(productName, `{"quantity":"${updatedTotal}","price":"${price}"}`);
            if (updatedTotal == 0) {
                localStorage.removeItem(productName);
            }
            this.updateQtyDisplay(updatedTotal);
        }

    }
    onAddToCartClicked=()=>{
        const productName = this.#internals.shadowRoot.querySelector('section[class="right"] h1').innerHTML;
        const price = Number(this.#internals.shadowRoot.querySelector('section[class="current-price"]').innerHTML.replace("$", ""));
        if (localStorage.getItem(productName)) {
            let val = JSON.parse(localStorage.getItem(productName));
            const updatedTotal = Number(val.quantity);
            localStorage.setItem(productName, `{"quantity":"${updatedTotal}","price":"${price}","addToCart":"True"}`);
            if (updatedTotal == 0) {
                localStorage.removeItem(productName);
            }else{
                window.dispatchEvent(new CustomEvent("Item added to cart", {}));
            }
        }
    }
    updateQtyDisplay = (updatedTotal, callback = window.dispatchEvent(new StorageEvent('storage', {}))) => {
        this.#internals.shadowRoot.querySelector('span[class="quantity"]').innerHTML = updatedTotal;
    }
    static get observedAttributes() {
        return [
        ];
    }
}
if (!customElements.get("product-display-component")) {
    customElements.define("product-display-component", ProductDisplayComponent);
}