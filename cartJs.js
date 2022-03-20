// Try to get data from server alert error if failed
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

// Function to display items in table from fetched Object
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

  td5.innerText = `${item.amount}`;

  const td6 = tr.insertCell();
  td6.innerText = `$${(item.price * item.amount).toFixed(2)}`;
}

// Fetch all data from server and item ids in cart

const itemsInCart = async () => {
  const products = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/products"
  );
  const cart = await getData(
    "https://demo-17-vnoq3.ondigitalocean.app/cart/1108099398"
  );

  // new array to store objects that are added to cart and for each object add new amount key.
  const cartFruits = [];
  products.forEach((e) => {
    e.amount = 1;
  });

  //   Compare cart and all products arrays and if they match add them to the new cartFruit array if there is already the same object in array juct increase the amount

  cart.forEach((value) => {
    products.forEach((element) => {
      if (value === element.id && cartFruits.includes(element)) {
        return element.amount++;
      }
      if (value === element.id) {
        cartFruits.push(element);
      }
    });
  });

  //   for each array elemnt display product in table
  cartFruits.forEach((element) => {
    displayItemsinCart(element);
  });
};

itemsInCart();
