document.addEventListener("DOMContentLoaded", function() {
  const coinId = 'brick';
  const chartContainer = document.querySelector('#chart');

  function displayPrice() {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`)
      .then(response => response.json())
      .then(data => {
        const price = data[coinId].usd;
        const priceElement = document.querySelector('.price');
        priceElement.textContent = '$' + price.toFixed(8);

        // Chart
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
          .then(response => {
            const chartData = response.data.prices.map(price => {
              return {
                x: price[0],
                y: price[1]
              }
            });
            const chartOptions = {
              plugins: {
                title: {
                  display: true,
                  text: `${coinId.toUpperCase()} Price Chart`
                },
                legend: {
                  display: false
                }
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'day',
                    tooltipFormat: 'MMM DD, YYYY'
                  },
                  ticks: {
                    source: 'auto'
                  },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: false
                  },
                  gridLines: {
                    color: '#ddd'
                  }
                }]
              }
            };
            const chart = new Chart(chartContainer, {
              type: 'line',
              data: {
                datasets: [{
                  data: chartData,
                  borderColor: '#3e95cd',
                  fill: false
                }]
              },
              options: chartOptions
            });
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }

  setInterval(displayPrice, 30000);
});




