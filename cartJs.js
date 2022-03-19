const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return alert(error.message || "An error has hapened");
  }
};

const tbody = document.querySelector("tbody");
const quantity = 1;

function displayItemsinCart(item) {
  const tr = tbody.insertRow();

  const td1 = tr.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "x";
  td1.appendChild(deleteBtn);

  const td2 = tr.insertCell();
  const img = document.createElement("img");
  img.src = `${item.image}`;
  img.alt = `${item.title}`;
  td2.appendChild(img);

  const td3 = tr.insertCell();
  td3.innerText = `${item.title}`;

  const td4 = tr.insertCell();
  td4.innerText = `$${item.price.toFixed(2)}`;

  const td5 = tr.insertCell();

  td5.innerText = quantity;

  const td6 = tr.insertCell();
  td6.innerText = `$${item.price.toFixed(2) * quantity}`;
}

const itemsInCart = async () => {
  const products = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/products"
  );
  const cart = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/cart/1108099398"
  );

  console.log(products);
  console.log(cart);

  const cartFruits = [];

  cart.forEach((value) => {
    products.forEach((element) => {
      if (value === element.id) {
        displayItemsinCart(element);
        cartFruits.push(element);
      }
    });
  });

  console.log(cartFruits);
};

itemsInCart();
