const container = document.querySelector(".content");

//Creating and implementing output section on DOM

const outputParent = document.querySelector("#parent-output");
outputParent.className = "section";

const outputTitle = document.createElement("div");
outputTitle.id = "output-title";
outputTitle.className = "outputs";
outputTitle.innerText = "Next Satellite Pass Will Be";

const outputRise = document.createElement("div");
outputRise.id = "output-rise";
outputRise.className = "outputs";
outputRise.innerHTML = "Rise:";

const outputCulminate = document.createElement("div");
outputCulminate.id = "output-culminate";
outputCulminate.className = "outputs";
outputCulminate.innerHTML = "Culminate:";

const outputSet = document.createElement("div");
outputSet.id = "output-set";
outputSet.className = "outputs";
outputSet.innerHTML = "Set:";

outputParent.appendChild(outputTitle);
outputParent.appendChild(outputRise);
outputParent.appendChild(outputCulminate);
outputParent.appendChild(outputSet);

//query address and Api text input
const addressInput = document.querySelector("#address");
const apiInput = document.querySelector("#api-key");

const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    addressInput.value
  )}.json?access_token=${apiInput.value}`;

  fetch(URL)
    .then((rawRes) => {
      console.log("Response", rawRes);
      return rawRes.json();
    })
    .then((json) => {
      console.log("Json", json);
      console.log(json.features[0].center[0], json.features[0].center[1]);

      //defined variables with values of longitude and latitude and queried satellite text input
      const long = json.features[0].center[0];
      const lat = json.features[0].center[1];
      const satellites = document.querySelector("#norad");

      //queried the url for satellites fly
      const URL1 = `https://satellites.fly.dev/passes/${satellites.value}?lat=${lat}&lon=${long}&limit=1&days=15&visible_only=true`;
      fetch(URL1)
        .then((rawRes1) => {
          console.log("Response", rawRes1);
          return rawRes1.json();
        })
        .then((json1) => {
          console.log("Json", json1);
          console.log(
            "Rise",
            json1[0].rise.utc_datetime,
            "Culminate",
            json1[0].culmination.utc_datetime,
            "Set",
            json1[0].set.utc_datetime
          );
          outputTitle.innerHTML = `Next Satellite Pass in ${addressInput.value.toUpperCase()} will be`;
          outputRise.innerHTML += " " + json1[0].rise.utc_datetime;
          outputCulminate.innerHTML += " " + json1[0].culmination.utc_datetime;
          outputSet.innerHTML += " " + json1[0].set.utc_datetime;

          addressInput.value = "";
          apiInput.value = "";
          satellites.value = "";
        });
    });
});
