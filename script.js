document.addEventListener("DOMContentLoaded", function() {
const coinId = 'brick';

function displayPrice() {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
      const price = data[coinId].usd;
      const priceElement = document.querySelector('.price');
      priceElement.textContent = '$' + price.toFixed(8);
    })
    .catch(error => console.error(error));
}


setInterval(displayPrice, 30000);
});



