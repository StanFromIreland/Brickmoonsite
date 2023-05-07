document.addEventListener("DOMContentLoaded", function() {
  const coinId = 'brick';
  const chartContainer = document.querySelector('#chart-container');
  const menuButton = document.querySelector('#menu-button');
  const menu = document.querySelector('#menu');

  function displayPrice() {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`)
      .then(response => response.json())
      .then(data => {
        const price = data.prices[data.prices.length - 1][1];
        const priceElement = document.querySelector('.price');
        priceElement.textContent = '$' + price.toFixed(8);
      });
  }

  function displayChart(data) {
    const prices = data.prices.map(price => price[1]);
    const timestamps = data.prices.map(price => price[0]);

    const options = {
      chart: {
        type: 'line'
      },
      series: [
        {
          name: 'BRICK Price',
          data: prices
        }
      ],
      xaxis: {
        type: 'datetime',
        categories: timestamps
      }
    };

    const chart = new ApexCharts(document.querySelector('#chart-container'), options);
    chart.render();
  }

  setInterval(displayPrice, 30000);

  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`)
    .then(response => response.json())
    .then(data => displayChart(data));

  function toggleMenu() {
    menu.classList.toggle('active');
    menuButton.classList.toggle('active');
  }

  function closeMenu() {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuButton.classList.remove('active');
    }
  }

  menuButton.addEventListener('click', toggleMenu);

  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && menu.classList.contains('active')) {
      closeMenu();
    }
  });
});
