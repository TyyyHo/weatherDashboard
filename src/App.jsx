import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ location: [] });
  const [optionIndex, setIndex] = useState(0);

  const date = () => {
    let d = new Date();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
      .toString()
      .padStart(2, "0");
    let minute = d.getMinutes().toString().padStart(2, "0");

    const weekendList = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    let weekend = weekendList[d.getDay()];

    return `${month + 1}/${day} ${weekend} ${hour}:${minute}`;
  };

  // let data = { location: [] };
  let location;
  let weatherSituation;
  let maxTemperature;
  let minTemperature;
  let chanceOfRaining;

  if (data.location[optionIndex] !== undefined) {
    let seletedLoaction = data.location[optionIndex];
    weatherSituation =
      seletedLoaction.weatherElement[0].time[0].parameter.parameterName;
    location = data.location[optionIndex].locationName;
    maxTemperature =
      seletedLoaction.weatherElement[4].time[0].parameter.parameterName;
    minTemperature =
      seletedLoaction.weatherElement[2].time[0].parameter.parameterName;
    chanceOfRaining =
      seletedLoaction.weatherElement[1].time[0].parameter.parameterName;
  }

  useEffect(() => {
    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-BC636609-BA31-4490-908B-FF44F4110E3A&format=JSON";
    axios
      .get(url)
      .then((res) => setData(res.data.records))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <select
        name=""
        id="selectList"
        onChange={(e) => setIndex(e.target.value)}
      >
        {data.location.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item.locationName}
            </option>
          );
        })}
      </select>
      <h1 id="location">{location}</h1>
      <h4>{date()}</h4>
      <h4 className="text">現在天氣</h4>
      <div className="text">{`天氣概況: ${weatherSituation}`}</div>
      <div className="text">{`降雨機率: ${chanceOfRaining}%`}</div>
      <div className="text">
        {`氣溫: ${minTemperature}~${maxTemperature}`}
        <span>&deg;C</span>
      </div>
    </div>
  );
}

export default App;
