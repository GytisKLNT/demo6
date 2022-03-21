const basketId = Number(localStorage.getItem("cartId"));

if (!basketId) {
  alert("you have no products added");
  location.replace("/");
}

// Try to get data from server alert error if failed
const getData = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const mapProducts = (cart, products) => {
  return products
    .map((product) => ({
      ...product,
      quantity: cart.filter((item) => product.id === item).length,
    }))
    .filter((product) => product.quantity > 0);
};

// Function to display items in table from fetched Object
function displayItemsinCart(items) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  items.forEach((item) => {
    const tr = tbody.insertRow();

    const td1 = tr.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "x";
    deleteBtn.addEventListener("click", async () => {
      const res = await fetch(
        `https://demo-17-vnoq3.ondigitalocean.app/cart/${basketId}/${item.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.msg === "OK") {
        tr.remove();
      }
    });
    td1.appendChild(deleteBtn);

    const td2 = tr.insertCell();
    const img = document.createElement("img");
    img.src = `${item.image}`;
    img.alt = `${item.title}`;
    td2.appendChild(img);

    const td3 = tr.insertCell();
    td3.innerText = `${item.title}`;

    const td4 = tr.insertCell();
    td4.innerText = `$${item.price}`;

    const td5 = tr.insertCell();

    td5.innerText = `${item.quantity}`;

    const td6 = tr.insertCell();
    td6.innerText = "$" + item.price * item.quantity;
  });
}

// Fetch all data from server and item ids in cart

const itemsInCart = async () => {
  try {
    const data = await Promise.all([
      getData("https://demo-17-vnoq3.ondigitalocean.app/products"),
      getData(`https://demo-17-vnoq3.ondigitalocean.app/cart/${basketId}`),
    ]);

    const cartItems = mapProducts(data[1], data[0]);
    displayItemsinCart(cartItems);

    /*

    // new array to store objects that are added to cart and for each object add new amount key.
    data[0].forEach((e) => {
      e.amount = 1;
    });

    const cartFruits = [];

    //   Compare cart and all products id's arrays and if they match add them to the new cartFruit array if there is already the same object in array juct increase the amount

    data[1].forEach((value) => {
      data[0].forEach((element) => {
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
    }); */
  } catch (error) {
    alert(error.message);

    console.log(error);
  }
};

itemsInCart();
