import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [berries, setBerries] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
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

  return (
    <div>
      {fetchedData.map((sprite) => {
        const spriteUrl = sprite.sprites.default;
        const spriteName = sprite.name.replace("-", " ").toUpperCase();

        return (
          <button className="berryBtn">
            <p>{spriteName}</p>
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
