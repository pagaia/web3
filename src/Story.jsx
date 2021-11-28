import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./data/JokePortal.json";
import ErrorMessage from "./ErrorMessage";
import {contractAddress} from "./data/constants";

const Story = () => {

  const contractABI = abi.abi;

  const [disabled, disableButton] = useState(true);
  const [newJoke, setNewJoke] = useState("");
  const [error, setError] = useState(null);
  const [mining, setMining] = useState(false);

  const onChangeText = (e) => {
    disableButton(e.target.value.trim() == "");
    setNewJoke(e.target.value.trim())
    console.log("disable button: ", e.target.value.trim() == "")
  }

  const resetText = () => {
    document.getElementById('joke').value = ''
  }

  const addStory = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setMining(true);
        setError(null);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const jokeTxn = await jokePortalContract.tellAJoke(newJoke);
        console.log("Mining...", jokeTxn.hash);

        await jokeTxn.wait();
        console.log("Mined -- ", jokeTxn.hash);

        const count = await jokePortalContract.getTotalJokes();
        console.log("Retrieved total jokes count...", count.toNumber());
        resetText();
        setMining(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log({error})
      setMining(false);
      setError(error);
    }
  }

  return (
    <form className="px-8 pt-6 mb-4 bg-white rounded">

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="joke">
          Add your piece
				</label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="joke"
          type="text"
          onChange={onChangeText}
        />
      </div>
    
      <div className="mb-6 text-center">
        {mining ?
        <div className="flex justify-center items-center">
          <div
            className="
              animate-spin
              rounded-full
              h-12
              w-12
              border-t-2 border-b-2 border-purple-500
            ">
          </div>
        </div>
         :<button
          className="disabled:opacity-50 w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addStory}
          disabled={disabled}
        >
         Add you piece
				</button>
        }
      </div>
      <ErrorMessage message={error && error.error && error.error.message}/>
    
    </form>
  )

}

export default Story;