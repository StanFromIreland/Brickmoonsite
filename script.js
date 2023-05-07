const coinId = 'brick';

function displayPrice() {
  const timestamp = new Date().getTime(); 
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&_=${timestamp}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const price = data[coinId].usd;
      const priceElement = document.querySelector('.price');
      priceElement.textContent = '$' + price.toFixed(8);
    })
    .catch(error => console.error(error));
}

setInterval(displayPrice, 1000);

document.addEventListener("DOMContentLoaded", function() {
});






