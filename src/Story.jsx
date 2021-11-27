import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "./data/JokePortal.json";
import useJokes from './hooks/getJokes.jsx';

const Story = () => {

  const contractABI = abi.abi;
  const contractAddress = '0x7dEef0505Cd56a7205Cdc80711dDD889f461C76d';

  const [disabled, disableButton] = useState(true);
  const [newJoke, setNewJoke] = useState("");
  const [checkAgain, setCheckAgain] = useState(0);
  const { count, lastJoke } = useJokes()


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
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
                let count = await jokePortalContract.getTotalJokes();
                console.log("Retrieved total jokes count...", count.toNumber());
        
                const joke = await jokePortalContract.getLastJoke();
        */
        /*
        * Execute the actual wave from your smart contract
        */
        const jokeTxn = await jokePortalContract.tellAJoke(newJoke);
        console.log("Mining...", jokeTxn.hash);

        await jokeTxn.wait();
        console.log("Mined -- ", jokeTxn.hash);

        const count = await jokePortalContract.getTotalJokes();
        console.log("Retrieved total jokes count...", count.toNumber());
        setCheckAgain(count)
        resetText();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="px-8 pt-6 mb-4 bg-white rounded">
      <div className="mb-4">
        <p className="bio text-center mb-4">
          <span>Story number {`${count}`}: </span>
          <span>{lastJoke}</span>
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="joke">
          Tell me a joke
				</label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="joke"
          type="text"
          onChange={onChangeText}
        />
      </div>



      <div className="mb-6 text-center">
        <button
          className="disabled:opacity-50 w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addStory}
          disabled={disabled}
        >
          Write a joke in the chain
				</button>
      </div>
      <hr className="mb-6 border-t" />
    </form>
  )

  return (<article>
    <input type="text" name="joke" />
    <button className="waveButton" onClick={addStory}>
      Add a new peace of the story
    </button>
  </article>
  );
}

export default Story;