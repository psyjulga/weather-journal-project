const loadApp = () => {
  // update UI => get request => get data from server and update UI
  const updateUI = async () => {
    const res = await fetch("/all");
    try {
      const data = await res.json();
      const dateEntry = document.getElementById("date");
      const tempEntry = document.getElementById("temp");
      const contentEntry = document.getElementById("content");
      dateEntry.innerHTML = data.date;
      tempEntry.innerHTML = `${data.temp}°C`;
      contentEntry.innerHTML = `"${data.content}"`;
    } catch (e) {
      console.log("error in updateUI", e);
    }
  };

  // post request => send data to server
  const postData = async (url = " ", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
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
    // get temperature out of that data to send it to the server
    const temp = Math.round(data.main.temp);
    // create a new date instance dynamically with JS
    // to send the current date to the server
    let d = new Date();
    let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    // post relevant data to server and trigger update UI
    postData("/all", { date: newDate, temp: temp, content: feelingsInput })
      .then(() => updateUI())
      .catch((e) => console.log("error in postData in handleSubmit", e));
  };

  const form = document.getElementById("form");
  form.addEventListener("submit", handleSubmit);
};

window.addEventListener("DOMContentLoaded", loadApp, false);
