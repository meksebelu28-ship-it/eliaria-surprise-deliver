const products = [

  {
    id: 1,
    name: "Fresh Food Package",
    category: "food",
    price: 35,
    desc: "Fresh fruits and vegetables for a caring surprise.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 2,
    name: "Lamb (1kg)",
    category: "meat",
    price: 12,
    desc: "Quality lamb for a family meal.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 3,
    name: "Fresh Milk (1L)",
    category: "dairy",
    price: 3,
    desc: "Fresh dairy for your loved ones.",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 4,
    name: "Eggs (Dozen)",
    category: "dairy",
    price: 4,
    desc: "A practical everyday gift for the family.",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 5,
    name: "Red Roses Bouquet",
    category: "flowers",
    price: 25,
    desc: "A beautiful romantic bouquet.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 6,
    name: "Mixed Flowers",
    category: "flowers",
    price: 20,
    desc: "A colorful bouquet for every occasion.",
    image:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 7,
    name: "Red Wine",
    category: "wine",
    price: 30,
    desc: "A special bottle for a special celebration.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 8,
    name: "Birthday Cake",
    category: "cake",
    price: 28,
    desc: "Celebrate their day with a beautiful cake.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 9,
    name: "Biscuits Box",
    category: "cake",
    price: 15,
    desc: "Sweet treats to add to your surprise.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 10,
    name: "Perfume (Women)",
    category: "perfume",
    price: 45,
    desc: "A lovely fragrance gift for her.",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 11,
    name: "Perfume (Men)",
    category: "perfume",
    price: 50,
    desc: "A refined fragrance gift for him.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 12,
    name: "Gift Basket",
    category: "other",
    price: 40,
    desc: "A ready-made basket full of thoughtful gifts.",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 13,
    name: "Sheep",
    category: "meat",
    price: 180,
    desc: "A meaningful family gift for a special occasion.",
    image:
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 14,
    name: "Cow",
    category: "meat",
    price: 750,
    desc: "A generous livestock surprise for your family.",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 15,
    name: "Bull",
    category: "meat",
    price: 900,
    desc: "A major family gift for an important celebration.",
    image:
      "https://images.unsplash.com/photo-1545468258-1e6c3f6d9e1d?auto=format&fit=crop&w=800&q=85"
  },


  {
    id: 16,
    name: "Chicken",
    category: "food",
    price: 15,
    desc: "Fresh chicken for a family meal.",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=85"
  }

];



/* CART */

let cart =
  JSON.parse(
    localStorage.getItem("eliariaCart") || "[]"
  );



function saveCart() {

  localStorage.setItem(
    "eliariaCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}



function updateCartCount() {

  const count =
    cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  const el =
    document.querySelector("#cartCount");


  if (el) {

    el.textContent = count;

  }

}



/* ADD TO CART */

function addToCart(id) {

  const product =
    products.find(
      p => p.id === id
    );


  if (!product) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.qty++;

  }

  else {

    cart.push({
      ...product,
      qty: 1
    });

  }


  saveCart();

  renderCart();

  openCart();

}



/* CHANGE QUANTITY */

function changeQty(id, amount) {

  const item =
    cart.find(
      p => p.id === id
    );


  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        p => p.id !== id
      );

  }


  saveCart();

  renderCart();

}



/* REMOVE */

function removeFromCart(id) {

  cart =
    cart.filter(
      p => p.id !== id
    );


  saveCart();

  renderCart();

}



/* DISPLAY CART */

function renderCart() {

  const box =
    document.querySelector("#cartItems");

  const total =
    document.querySelector("#cartTotal");


  if (!box || !total) return;


  if (!cart.length) {

    box.innerHTML = `
      <div class="empty">
        Your cart is empty.
        <br>
        Add a gift for someone you love. ♥
      </div>
    `;

    total.textContent = "$0";

    return;

  }



  box.innerHTML =
    cart.map(item => `

      <div class="cart-row">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div>

          <h4>
            ${item.name}
          </h4>

          <p>
            $${item.price.toFixed(2)} each
          </p>


          <div class="qty">

            <button
              onclick="changeQty(${item.id}, -1)"
            >
              −
            </button>

            <strong>
              ${item.qty}
            </strong>

            <button
              onclick="changeQty(${item.id}, 1)"
            >
              +
            </button>

          </div>


          <button
            class="remove"
            onclick="removeFromCart(${item.id})"
          >
            Remove
          </button>

        </div>


        <strong>
          $${(
            item.price *
            item.qty
          ).toFixed(2)}
        </strong>

      </div>

    `).join("");



  const sum =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.qty,
      0
    );


  total.textContent =
    "$" + sum.toFixed(2);

}



/* OPEN CART */

function openCart() {

  const drawer =
    document.querySelector("#cartDrawer");


  if (drawer) {

    drawer.classList.add("open");

  }

}



/* CLOSE CART */

function closeCart() {

  const drawer =
    document.querySelector("#cartDrawer");


  if (drawer) {

    drawer.classList.remove("open");

  }

}



/* HEADER */

function setupHeader() {


  const menuToggle =
    document.querySelector("#menuToggle");


  const nav =
    document.querySelector(".main-nav");


  if (menuToggle && nav) {

    menuToggle.addEventListener(
      "click",
      () => {

        nav.classList.toggle("open");

      }
    );

  }



  /* SEARCH */

  const searchToggle =
    document.querySelector("#searchToggle");


  const panel =
    document.querySelector("#searchPanel");


  const input =
    document.querySelector("#globalSearch");


  if (searchToggle && panel) {

    searchToggle.addEventListener(
      "click",
      () => {

        panel.classList.toggle("open");


        if (
          panel.classList.contains("open")
        ) {

          input?.focus();

        }

      }
    );

  }



  if (input) {

    input.addEventListener(
      "keydown",
      e => {

        if (
          e.key === "Enter" &&
          input.value.trim()
        ) {

          window.location.href =
            "products.html?search=" +
            encodeURIComponent(
              input.value.trim()
            );

        }

      }
    );

  }



  /* CART */

  document
    .querySelector("#cartOpen")
    ?.addEventListener(
      "click",
      openCart
    );


  document
    .querySelector("#cartClose")
    ?.addEventListener(
      "click",
      closeCart
    );


  document
    .querySelector("#cartX")
    ?.addEventListener(
      "click",
      closeCart
    );



  /* CHECKOUT */

  document
    .querySelector("#checkoutBtn")
    ?.addEventListener(
      "click",
      () => {

        if (!cart.length) {

          alert(
            "Your cart is empty."
          );

          return;

        }


        alert(
          "Order step ready. Next, connect WhatsApp, a form, or a payment provider."
        );

      }
    );

}



/* PRODUCT CARD */

function productCard(product) {

  return `

    <article class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >


      <div class="product-info">

        <h3>
          ${product.name}
        </h3>


        <p>
          ${product.desc}
        </p>


        <div class="product-bottom">

          <span class="price">
            $${product.price.toFixed(0)}
          </span>


          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </article>

  `;

}



/* PRODUCT PAGE */

function setupProductsPage() {

  const grid =
    document.querySelector("#productGrid");


  if (!grid) return;



  const params =
    new URLSearchParams(
      location.search
    );


  let currentCategory =
    params.get("category") ||
    "all";


  let currentSearch =
    params.get("search") ||
    "";



  const filters =
    [
      ...document.querySelectorAll(
        ".filter"
      )
    ];



  function render() {


    let list =
      [...products];



    /* CATEGORY */

    if (
      currentCategory !== "all"
    ) {

      list =
        list.filter(
          p =>
            p.category ===
            currentCategory
        );

    }



    /* SEARCH */

    if (currentSearch) {

      list =
        list.filter(
          p =>
            (
              p.name +
              " " +
              p.desc
            )
              .toLowerCase()
              .includes(
                currentSearch.toLowerCase()
              )
        );

    }



    /* SORT */

    const sort =
      document.querySelector(
        "#sortProducts"
      )?.value ||
      "default";


    if (sort === "low") {

      list.sort(
        (a,b) =>
          a.price - b.price
      );

    }


    if (sort === "high") {

      list.sort(
        (a,b) =>
          b.price - a.price
      );

    }


    if (sort === "name") {

      list.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name
          )
      );

    }



    /* DISPLAY */

    grid.innerHTML =
      list.length

        ? list
            .map(productCard)
            .join("")

        : `

          <div
            class="empty"
            style="grid-column:1/-1"
          >

            No products found.
            <br>
            Try another search.

          </div>

        `;



    const count =
      document.querySelector(
        "#resultCount"
      );


    if (count) {

      count.textContent =
        `Showing ${list.length} product${
          list.length === 1
            ? ""
            : "s"
        }`;

    }

  }



  /* FILTER */

  function activate(category) {

    currentCategory =
      category;


    filters.forEach(
      btn => {

        btn.classList.toggle(
          "active",
          btn.dataset.category ===
            category
        );

      }
    );


    render();

  }



  filters.forEach(
    btn => {

      btn.addEventListener(
        "click",
        () =>
          activate(
            btn.dataset.category
          )
      );

    }
  );



  /* SORT */

  document
    .querySelector("#sortProducts")
    ?.addEventListener(
      "change",
      render
    );



  render();

}



/* START */

setupHeader();

updateCartCount();

renderCart();

setupProductsPage();