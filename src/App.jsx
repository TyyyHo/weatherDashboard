import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ location: [] });
  const [optionIndex, setIndex] = useState(0);
  const [time, setTime] = useState();

  const date = () => {
    let d = new Date();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
      .toString()
      .padStart(2, "0");
    let minute = d.getMinutes().toString().padStart(2, "0");

    const weekendList = ["天", "一", "二", "三", "四", "五", "六"];
    let weekend = `星期${weekendList[d.getDay()]}`;

    return `${month + 1}/${day} ${weekend} ${hour}:${minute}`;
  };

  let location,
    weatherSituation,
    maxTemperature,
    minTemperature,
    chanceOfRaining;
  if (data.location[optionIndex] !== undefined) {
    // 0:天氣概況; 1:降雨機率; 2:最低溫度; 4:最高溫度;
    let weatherOption = (params) => {
      return data.location[optionIndex].weatherElement[params].time[0].parameter
        .parameterName;
    };
    location = data.location[optionIndex].locationName;
    weatherSituation = weatherOption(0);
    maxTemperature = weatherOption(4);
    minTemperature = weatherOption(2);
    chanceOfRaining = weatherOption(1);
  }

  useEffect(() => {
    setTime(date());
    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-BC636609-BA31-4490-908B-FF44F4110E3A&format=JSON";
    axios
      .get(url)
      .then((res) => setData(res.data.records))
      .catch((err) => console.log(err));
  }, []);

  console.log("new branch-1")

  return (
    <div className="App">
      <select
        id="selectList"
        onChange={(e) => {
          setIndex(e.target.value);
          setTime(date());
        }}
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
      <h4>{time}</h4>
      <p className="refresh" onClick={()=>setTime(date())}>刷新時間</p>
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
