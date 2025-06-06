const ctx = document.getElementById("myChart").getContext("2d");
const channelID = "2778607";
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?results=10`;

let soli1d1 = 0;
let soli2d1 = 0;
let soli3d1 = 0;
let tempd1 = 0;
let humd1 = 0;

const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "Soil Moisture 1",
            "Soil Moisture 2",
            "Soil Moisture 3",
            "Temperature",
            "Humidity"
        ],
        datasets: [{
            label: "Sensor Data",
            data: [soli1d1, soli2d1, soli3d1, tempd1, humd1],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const feed = data.feeds[0];
        soli1d1 = Number(feed.field1);
        soli2d1 = Number(feed.field2);
        soli3d1 = Number(feed.field3);
        tempd1 = Number(feed.field4);
        humd1 = Number(feed.field5);

        const display = `
      <p class ="text-xl font-semibold mb-4 text-black-900">Soil Moisture 1: ${soli1d1}</p>
      <p class ="text-xl font-semibold mb-4 text-black-900">Soil Moisture 2: ${soli2d1}</p>
      <p class ="text-xl font-semibold mb-4 text-black-900">Soil Moisture 3: ${soli3d1}</p>
      <p class ="text-xl font-semibold mb-4 text-black-900">Temperature: ${tempd1} °C</p>
      <p class ="text-xl font-semibold mb-4 text-black-900" >Humidity: ${humd1} %</p>
      <p class ="text-xl font-semibold mb-4 text-black-900">Time: ${new Date(feed.created_at).toLocaleString()}</p>
    `;
        document.getElementById("dataDisplay").innerHTML = display;
        // Update the chart with new data
        myChart.data.datasets[0].data = [
            soli1d1, soli2d1, soli3d1, tempd1, humd1
        ];
        myChart.update();
    } catch (err) {
        console.error("Failed to fetch ThingSpeak data:", err);
        document.getElementById("dataDisplay").textContent = "Error loading data.";
    }
}

fetchData();
setInterval(fetchData, 5000);