import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [berries, setBerries] = useState([]);
  const [berryUrl, setBerryUrl] = useState([]);
  const berryArray = [];

  // fetches the initial pokeApi to get the berry names
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/item?limit=10&offset=125")
      .then((response) => {
        if (!response.ok) {
          throw new Error("something wrong");
        }
        return response.json();
      })
      .then((data) => {
        data.results.map((result) => {
          console.log("result", result.url);
          berryArray.push(result.url);
        });
      })
      .then(() => {
        setBerryUrl(berryArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("berry", berries);
  // map through berries to get the item url

  return <div>what the fuck</div>;
};

export default Main;
