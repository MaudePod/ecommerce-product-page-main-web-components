import CartItemComponent from "./CartItemComponent.js";

export default class CartComponent extends HTMLElement {
  #internals;
  constructor() {
    super();
    this.#internals = this.attachInternals();
  }
  connectedCallback(
  ) {
    this.#internals.shadowRoot.querySelector('slot[name="cart-items"]').innerHTML = this.getCartItems();
    window.addEventListener('Item added to cart', (event) => {
      this.#internals.shadowRoot.querySelector('slot[name="cart-items"]').innerHTML = this.getCartItems();
      this.updateCartCount();
    })
    window.addEventListener('Item removed from cart', (event) => {
      this.#internals.shadowRoot.querySelector('slot[name="cart-items"]').innerHTML = this.getCartItems();
      this.updateCartCount();
    })
  }
  updateCartCount = () =>{
    let count=0
    Object.keys(localStorage).forEach(function (key) {
      let item = JSON.parse(localStorage.getItem(key));
      if(item.addToCart){
        count += Number(item.quantity);
      }
    });
    if(count > 0){
    this.#internals.shadowRoot.querySelector('span[class="cart-count"]'). style.display="grid";
    }else{
    this.#internals.shadowRoot.querySelector('span[class="cart-count"]'). style.display="none";
    }
    this.#internals.shadowRoot.querySelector('span[class="cart-count"]').innerHTML=count;
  }
  getCartItems = () => {
    let html = "";

    Object.keys(localStorage).forEach(function (key) {
      let item = JSON.parse(localStorage.getItem(key));
      if(item.addToCart){
        const amount = Number(item.quantity);
        const unitPrice = Number(item.price);
        const total = Number(item.quantity) * Number(item.price);
        html += `
                    <cart-item-component
                        product-name = "${key}"
                        product-unit-price = "$${unitPrice} x ${amount}"
                        total = "$${total}"
                    >
                    </cart-item-component>
            `;
      }

    });
    if(localStorage.length==0 || html==""){
      html=`
      <span class="empty-cart-message">
          Your cart is empty.
      </span>
                    `;
    }
    return html;
  }

  disconnectedCallback() {
  }

  static get observedAttributes() {
    return [
    ];
  }
}
if (!customElements.get("cart-component")) {
  customElements.define("cart-component", CartComponent);
}