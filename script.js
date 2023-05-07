document.addEventListener("DOMContentLoaded", function() {
  const coinId = 'brick';
  const chartContainer = document.querySelector('#chart');

  function displayPrice() {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`)
      .then(response => response.json())
      .then(data => {
        const price = data.prices[data.prices.length - 1][1];
        const priceElement = document.querySelector('.price');
        priceElement.textContent = '$' + price.toFixed(8);
        displayChart(data); // Call the displayChart() function with the fetched data
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

    const chart = new ApexCharts(chartContainer, options); // Render the chart to the correct container
    chart.render();
  }

  setInterval(displayPrice, 30000);
});



