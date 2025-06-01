const channelID = "my_channel";
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?results=1`;

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const feed = data.feeds[0];

    const display = `
      <p>Soil Moisture 1: ${feed.field1}</p>
      <p>Soil Moisture 2: ${feed.field2}</p>
      <p>Soil Moisture 3: ${feed.field3}</p>
      <p>Temperature: ${feed.field4} °C</p>
      <p>Humidity: ${feed.field5} %</p>
      <p>Time: ${new Date(feed.created_at).toLocaleString()}</p>
    `;

    document.getElementById("dataDisplay").innerHTML = display;
  } catch (err) {
    console.error("Failed to fetch ThingSpeak data:", err);
    document.getElementById("dataDisplay").textContent = "Error loading data.";
  }
}
fetchData();
setInterval(fetchData, 5000);
