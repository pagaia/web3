import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import jokePortal from "../data/JokePortal.json";
import { contractAddress } from "../data/constants";

const useJokes = (account) => {

  const contractABI = jokePortal.abi;

  const [stories, setStories] = useState([])

  console.log({ account })
  useEffect(() => {

    const getJoke = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          let count = await jokePortalContract.getTotalJokes();
          console.log("Retrieved total jokes count...", count.toNumber());

          const story = await jokePortalContract.getStory();

          setStories(story);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
    }

    getJoke();
  }, [account])


  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    let jokeContract;

    const onNewJoke = (from, timestamp, message) => {
      console.log('NewJoke', from, timestamp, message);
      setStories(prevState => [
        ...prevState,
        {
          teller: from,
          timestamp: new Date(timestamp * 1000),
          message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      jokeContract = new ethers.Contract(contractAddress, contractABI, signer);
      jokeContract.on('NewJoke', onNewJoke);
    }

    return () => {
      if (jokeContract) {
        jokeContract.off('NewJoke', onNewJoke);
      }
    };
  }, []);

  return stories;

}

export default useJokes;