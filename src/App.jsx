import { useEffect, useState } from "react";
// axios
import axios from "axios";
import {
  IoMdSunny,
  IoMdCloudy,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// 1e9f8f2b050b6ec5f94a079ac0e2acdb
const APIkey = "1e9f8f2b050b6ec5f94a079ac0e2acdb";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Riobamba");
  //input
  const [inputValue, setInputValue] = useState("");

  // busqueda

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // console.log(inputValue);
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    input.value = "";

    e.preventDefault();
  };

  //fetch de la api
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    // console.log(url);
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl  animate-spin  " />
        </div>
      </div>
    );
  }

  //cambiar icono en base al clima
  let icon;
  // console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  //convertidor de fecha
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 ">
      <form className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full "
            type="text"
            placeholder="Search by coty or country "
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd]  w-12 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white " />
          </button>
        </div>
      </form>

      {/* card */}
      <div className="w-full bg-black/20 max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {/* card top */}
        <div className="   flex items-center gap-x-5  justify-around rounded-xl">
          {/* icono */}
          <div className="text-[87px]">{icon}</div>
          {/* nombre del pais */}
          <div className="text-2xl font-semibold ">
            {data.name},{data.sys.country}
          </div>
          {/* fecha  */}
          <div>
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
          </div>
        </div>
        {/* card body  */}
        <div className="my-20 ">
          <div className="flex justify-center items-center">
            {/* temperatura */}
            <div className="text-[144px] leading-none font-light ">
              {parseInt(data.main.temp)}
            </div>
            {/* celsius Icono */}
            <div className="text-4xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          {/* descripcion */}
          <div className="capitalize text-center">
            {data.weather[0].description}
          </div>
        </div>

        {/* card bottom */}
        <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
          <div className="flex justify-between ">
            <div className="flex items-center gap-x-2">
              {/* icono */}
              <div className=" text-[20px] ">
                <BsEye />
              </div>
              <div>
                Visibility{" "}
                <span className="ml-2">{data.visibility / 1000} km</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {/* icono */}
              <div className=" text-[20px] ">
                <BsThermometer />
              </div>
              <div className="flex">
                Feels like{" "}
                <div className="flex ml-2">
                  {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between ">
            <div className="flex items-center gap-x-2">
              {/* icono */}
              <div className=" text-[20px] ">
                <BsWater />
              </div>
              <div>
                Humidity <span className="ml-2">{data.main.humidity} </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              {/* icono */}
              <div className=" text-[20px] ">
                <BsWind />
              </div>
              <div>
                Wind <span className=" ml-2">{data.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
