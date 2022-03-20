const loadApp = () => {
  // update UI => get request => data from server

  const updateUI = async () => {
    console.log("hello from updateUI");
    // function to GET data from express and update HTML
    const res = await fetch("/all");
    try {
      const data = await res.json();
      console.log("data from server in updateUI", data);
      const dateEntry = document.getElementById("date");
      const tempEntry = document.getElementById("temp");
      const contentEntry = document.getElementById("content");
    } catch (e) {
      console.log("error in updateUI", e);
    }
  };

  // post request => data to server

  const postData = async (url = " ", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response); // does not work
    try {
      console.log("hello from postData");
      const newData = await response.json();
      console.log("newData in postData: ", newData);
      return newData;
    } catch (e) {
      console.log("error in postData: ", e);
    }
  };

  // API call to openweathermap

  const callApi = (zip) => {
    const apiKey = "521e636942417dbc233358cdf12445eb";
    const unit = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${apiKey}&units=${unit}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .catch((e) => console.log("error in callApi", e));
  };

  // handle submit after form submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get zip input to pass it to the API
    const zipInput = document.getElementById("zip").value;
    // get feelings input to send it to the server
    const feelingsInput = document.getElementById("feelings").value;
    // get data from the API call
    const data = await callApi(zipInput);
    console.log("data from callAPI in handleSubmit: ", data);
    // get temperature out of that data to send it to the server
    const temp = Math.round(data.main.temp);
    console.log("temp: ", temp);
    // create a new date instance dynamically with JS
    // to send the current date to the server
    let d = new Date();
    let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    // post relevant data to server and update UI
    postData("/all", [newDate, temp, feelingsInput])
      .then(() => updateUI())
      .catch((e) => console.log("error in postData in handleSubmit", e));
  };

  const form = document.getElementById("form");
  form.addEventListener("submit", handleSubmit);

  // Event listener to add function to existing HTML DOM element

  /* Function called by event listener */

  /* Function to GET Web API Data*/

  /* Function to POST data */

  /* Function to GET Project Data */
};

window.addEventListener("DOMContentLoaded", loadApp, false);
