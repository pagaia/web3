import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import jokePortal from "../data/JokePortal.json";

const useJokes = (check) => {

  const contractABI = jokePortal.abi;
  const contractAddress = '0x7dEef0505Cd56a7205Cdc80711dDD889f461C76d';

  const [joke, setJoke] = useState({})

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

          const lastJoke = await jokePortalContract.getLastJoke();

          setJoke({ count, lastJoke })
          /*
          * Execute the actual wave from your smart contract
          */
          /* const jokeTxn = await jokePortalContract.tellAJoke(joke);
           console.log("Mining...", jokeTxn.hash);
   
           await jokeTxn.wait();
           console.log("Mined -- ", jokeTxn.hash);
   
           count = await jokePortalContract.getTotalJokes();
           console.log("Retrieved total jokes count...", count.toNumber());
   */

        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
    }

    getJoke();
  }, [check])

  return joke

}

export default useJokes;