const products = [
  { name: "Fresh Nandini Milk (500ml)", price: 25, img: "https://i.imgur.com/SJrWfNP.png" },
  { name: "Nandini Curd (1kg)", price: 50, img: "https://i.imgur.com/3n5uvnK.png" },
  { name: "Nandini Cheese (200g)", price: 60, img: "https://i.imgur.com/kA1xzXK.png" },
  { name: "Nandini Milkshake (200ml)", price: 30, img: "https://i.imgur.com/eqJjbU1.png" }
];

const productList = document.getElementById('product-list');
products.forEach((p, index) => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <span>${p.name} - ₹${p.price}</span>
    <div class="qty-container">
      <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
      <input type="text" id="qty-${index}" class="qty-input" value="1" readonly>
      <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
    </div>
  `;
  productList.appendChild(div);
});

function changeQty(index, delta) {
  const qtyInput = document.getElementById(`qty-${index}`);
  let qty = parseInt(qtyInput.value) + delta;
  if (qty < 0) qty = 0;
  qtyInput.value = qty;
}

function showOrderSummary() {
  const orderList = document.getElementById('order-items');
  const totalAmountDisplay = document.getElementById('total-amount');
  let total = 0;
  orderList.innerHTML = '';

  products.forEach((product, index) => {
    const qty = parseInt(document.getElementById(`qty-${index}`).value);
    if (qty > 0) {
      const itemTotal = qty * product.price;
      const li = document.createElement('li');
      li.className = 'order-item';
      li.innerHTML = `<span>${product.name}</span><span>Qty: ${qty}</span><span>₹${itemTotal}</span>`;
      orderList.appendChild(li);
      total += itemTotal;
    }
  });

  totalAmountDisplay.textContent = total;
  document.getElementById('order-summary').style.display = 'block';
}

function payWithRazorpay() {
  const totalAmount = parseInt(document.getElementById('total-amount').textContent) * 100;

  const options = {
    key: 'rzp_test_YourKeyHere', // Replace with your Razorpay LIVE or TEST key
    amount: totalAmount,
    currency: 'INR',
    name: 'Milko',
    description: 'Milk Product Purchase',
    handler: function (response) {
      document.getElementById('order-summary').style.display = 'none';
      document.getElementById('notification').style.display = 'block';
      setTimeout(() => {
        document.getElementById('notification').style.display = 'none';
      }, 3000);
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    theme: {
      color: '#ffcc00'
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
