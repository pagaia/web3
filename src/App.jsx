import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import useCheckWallet from "./hooks/checkWallet.jsx";
import Story from './Story.jsx';
import ConnectWallet from "./ConnectWallet";
import ViewStory from "./ViewStory";
import useJokes from './hooks/getJokes.jsx';

export default function App() {

  const [currentAccount, connectWallet] = useCheckWallet();
  const { ethereum } = window;
  const stories = useJokes(currentAccount);

  return (

    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg logo"
          >
            <img src="https://publish.one37pm.net/wp-content/uploads/2021/09/HERO-13.jpg" />
          </div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">
              👋 Hey there!
              </h3>
            {
              currentAccount && <h2 className="welcome text-center">Welcome {currentAccount} </h2>
            }
            <div className="bio text-center">
              {ethereum ?
                <span> "Let's create a story. Once upon a time..."</span>
                : <span>Please download or connect with Metamask in order to login</span>
              }
            </div>


            {/* show story component only if a wallet is connected*/}
            {currentAccount && <Story />}


            <ConnectWallet currentAccount={currentAccount}
              connectWallet={connectWallet} />



          </div>
        </div>

      </div>
      <div>
        <hr className="mb-6 border-t" />
        <ViewStory stories={stories} />
      </div>
    </div>
  )

}
