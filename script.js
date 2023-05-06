document.addEventListener("DOMContentLoaded", function() {
const cryptocurrency = 'brick';
const currency = 'usd';

const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency}&vs_currencies=${currency}`;

axios.get(url)
  .then(response => {
    const price = response.data[cryptocurrency][currency];
    document.getElementById('price').innerText = `$${price.toFixed(2)}`;
  })
  .catch(error => {
    console.error(error);
  });

});



