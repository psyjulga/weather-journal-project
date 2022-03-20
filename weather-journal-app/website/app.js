console.log("hello from app");

// to fix "document is not defined"
window.addEventListener("DOMContentLoaded", loadApp, false);
// but now: "window is not defined" ????

function loadApp() {
  /* Global Variables */

  // Personal API Key for OpenWeatherMap API

  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

  // access html elements

  const dateEntry = document.getElementById("date");
  const tempEntry = document.getElementById("temp");
  const contentEntry = document.getElementById("content");
  const submitButton = document.getElementById("generate");

  const callApi = (zip) => {
    const apiKey = "521e636942417dbc233358cdf12445eb";
    const unit = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${apiKey}&units=${unit}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .catch((ex) => console.log("error in callApi", ex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get user input
    const zipInput = document.getElementById("zip").value;
    console.log("zipInput in handleSubmit", zipInput);
    const feelingsInput = document.getElementById("feelings").value;
    const data = await callApi(zipInput);
    console.log("data in hadleSubmit", data);
  };

  submitButton.addEventListener("submit", handleSubmit);

  // Event listener to add function to existing HTML DOM element

  /* Function called by event listener */

  /* Function to GET Web API Data*/

  /* Function to POST data */

  /* Function to GET Project Data */
}
