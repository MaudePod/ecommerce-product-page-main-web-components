const template = document.createElement("template");
template.innerHTML = `
      <section class="cart-item">
        <img src="./images/image-product-1-thumbnail.jpg" alt="Thumbnail">
        <span class="product-name">
        </span>
        <span class="product-unit-price"></span>
        <span class="total"></span>
        <button type="button" id="remove-item" title="Remove item from shoping cart">
          <svg viewbox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <path
                d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                id="a" />
            </defs>
            <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
          </svg>
        </button>
      </section>
      <style>
        section[class="cart-item"] {
          display: grid;
          grid-template-columns: 100px 1fr 1fr 50px;
          grid-template-rows: 50px 50px;
          width: 380px;
          align-items: center;
          gap: 5px;
          color: var(--dark-grayish-blue);
        }
    
        img {
          width: 100px;
          height: 100px;
          grid-row: span 2;
        }
    
        span[class="product-name"] {
          grid-column: span 2;
        }
    
        span[class="product-unit-price"] {
          grid-column: 2;
        }
    
        span[class="total"] {
          color: var(--very-dark-blue);
          font-size: larger;
          grid-column: 3;
          font-weight: 700;
        }
    
        button[id="remove-item"] {
          width: 50px;
          height: 50px;
          grid-column: 4;
          grid-row: 1 / 3;
          cursor: pointer;
          background-color: transparent;
          border: 0;
        }
    
        button[id="remove-item"] svg {
          height: 25px;
          width: 25px;
        }
      </style>
`;
export default class CartItemComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(
    ) {
        const shadowRoot = this.attachShadow({ mode: "open" })
        shadowRoot.appendChild(template.content.cloneNode(true));
        if (this.hasAttribute('img')) {
            this.shadowRoot.querySelector('img').src = this.getAttribute('img');
        }
        if (this.hasAttribute('product-name')) {
            this.shadowRoot.querySelector("span[class='product-name']").innerHTML = this.getAttribute('product-name');
        }
        if (this.hasAttribute('product-unit-price')) {
            this.shadowRoot.querySelector("span[class='product-unit-price']").innerHTML = this.getAttribute('product-unit-price');
        }
        if (this.hasAttribute('total')) {
            this.shadowRoot.querySelector("span[class='total']").innerHTML = this.getAttribute('total');
        }
        this.shadowRoot.querySelector('button[id="remove-item"]').addEventListener('click', (event) => {
            localStorage.removeItem(this.getAttribute('product-name'));
            window.dispatchEvent(new CustomEvent("Item removed from cart", {}));
        });

    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return [
            'img',
            'product-name',
            'product-unit-price',
            'total'
        ];
    }
}
if (!customElements.get("cart-item-component")) {
    customElements.define("cart-item-component", CartItemComponent);
}