import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [berries, setBerries] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const berryArray = [];
  const [clickCounts, setClickCounts] = useState(
    {
      button: 1,
      counter: 0,
      isActive: false,
    },
    {
      button: 2,
      counter: 0,
      isActive: false,
    },
    {
      button: 3,
      counter: 0,
      isActive: false,
    },
    {
      button: 4,
      counter: 0,
      isActive: false,
    }
  );
  const [money, setMoney] = useState(1000);

  // fetches the initial pokeApi to get the berry names
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/item?limit=4&offset=125")
      .then((response) => {
        if (!response.ok) {
          throw new Error("something wrong");
        }
        return response.json();
      })
      .then((data) => {
        data.results.map((result) => {
          berryArray.push(result.url);
        });
      })
      .then(() => {
        setBerries(berryArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // fetches all of the objects in the api
  const fetchDataFromUrls = async (urls) => {
    try {
      const fetchPromises = urls.map((url) =>
        fetch(url).then((response) => response.json())
      );

      const results = await Promise.all(fetchPromises);

      setFetchedData(results);
    } catch (error) {
      console.error("error fetch data:", error);
    }
  };

  // checks if there is any content in the berries State before running
  useEffect(() => {
    if (berries.length > 0) {
      const urls = berries.map((item) => item);
      fetchDataFromUrls(urls);
    }
  }, [berries]);

  useEffect(() => {
    if (clickCounts.length > 0) {
      const berryClick = clickCounts.map((click) => {
        console.log(click);
      });

      console.log("berry click", berryClick);
    }
  }, [clickCounts]);

  return (
    <div>
      <div>This is how much money you have to spend: ${money}</div>
      {fetchedData.map((sprite, key) => {
        const spriteUrl = sprite.sprites.default;
        const spriteName = sprite.name.replace("-", " ").toUpperCase();
        const buttonId = key + 1;

        const basePrice = (key + 1) * 500;

        return (
          <button className="berryBtn" key={key}>
            <p>{buttonId}</p>
            <p>{spriteName}</p>
            <p>${basePrice * buttonId}</p>
            <img src={spriteUrl} />
          </button>
        );
      })}
    </div>
  );
};

export default Main;

// i need the item url
// put the item urls in a state
//
// fetch the item url and get the sprite links
// each berry needs to have a price
// global value for each berry
