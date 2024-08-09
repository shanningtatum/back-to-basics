import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [berries, setBerries] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const berryArray = [];
  const [clickCounts, setClickCounts] = useState({
    button1: 0,
    button2: 0,
    button3: 0,
    button4: 0,
    button5: 0,
    button6: 0,
    button7: 0,
    button8: 0,
    button9: 0,
    button10: 0,
  });
  const [money, setMoney] = useState(500);

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

  const handleButtonClick = (buttonId) => {
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [buttonId]: prevCounts[buttonId] + 1,
    }));

    console.log(clickCounts);
  };

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
        const buttonId = "button" + (key + 1);

        return (
          <button
            className="berryBtn"
            key={key}
            onClick={() => handleButtonClick(buttonId)}
          >
            <p>{clickCounts[buttonId]}</p>
            <p>{spriteName}</p>
            <p>{key * 1 * clickCounts[buttonId]}</p>
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
