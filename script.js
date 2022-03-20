// Creates and ads fruit cards to main container

const displayProducts = (item) => {
  const container = document.querySelector(".container");
  const productBlock = document.createElement("div");
  productBlock.className = "product";

  const image = document.createElement("img");
  image.className = "img";
  image.src = `${item.image}`;
  image.alt = "fruit";

  const info = document.createElement("div");
  info.className = "info";

  const pavadinimas = document.createElement("h3");
  pavadinimas.className = "pavadinmas";
  pavadinimas.innerText = `${item.title}`;

  const rating = document.createElement("div");
  rating.className = "rating";
  rating.innerHTML = `${`<i class="fa-solid fa-star"></i>`.repeat(
    item.rating
  )}`;

  const kaina = document.createElement("h4");
  kaina.innerText = `$${item.price.toFixed(2)}`;

  const button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;

  productBlock.appendChild(image);
  productBlock.appendChild(info);
  info.appendChild(pavadinimas);
  info.appendChild(rating);
  info.appendChild(kaina);
  info.appendChild(button);
  container.appendChild(productBlock);

  //   On add to cart button click sends cart id and product id to backend

  const addedInCart = document.querySelector(".addedInCart");

  button.addEventListener("click", async () => {
    const res = await fetch("https://demo-17-vnoq3.ondigitalocean.app/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        randomId: 010203040506,
        productId: item.id,
      }),
    });
    const data = await res.json();
    console.log(data);
    addedInCart.style.display = "block";
  });
};

// GET data from backend

const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return alert(error.message || "An error has happened");
  }
};

// From where I get products and ratings

const dispayItems = async () => {
  const products = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/products"
  );
  const ratings = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/ratings"
  );

  //

  const items = products.map((products) => {
    const custRatings = ratings.filter(
      (rating) => rating.productId === products.id
    );
    const total = custRatings.reduce((c, v) => c + v.rating, 0);
    return {
      ...products,
      rating: Math.round(total / custRatings.length),
    };
  });

  items.forEach((item) => {
    displayProducts(item);
  });
};

dispayItems();
