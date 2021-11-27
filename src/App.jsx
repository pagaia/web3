import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import useCheckWallet from "./hooks/checkWallet.jsx";
import Story from './Story.jsx';

export default function App() {

  const [currentAccount, connectWallet] = useCheckWallet();


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
            <div className="bio text-center">
              Let's create a story. Once upon a time...
            </div>
           
            {currentAccount && ethereum && <Story />}

            {!ethereum &&
              <p>Please download or connect with Metamask in order to login</p>
            }

            {!currentAccount && ethereum && (
              <div className="px-8 pt-6 pb-12 mb-4 bg-white rounded">
                <div className="mb-6 text-center">
                  <button
                    onClick={connectWallet}
                    className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Connect your wallet
								</button>
                </div>
              </div>
            )}
            {
              currentAccount && <div className="welcome">Welcome {currentAccount} </div>
            }

          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          Let's create a story. Once upon a time...
        </div>

        <Story />

        {!ethereum &&
          <p>Please download or connect with Metamask in order to login</p>
        }

        {!currentAccount && ethereum && (
          <div className="mb-6 text-center">
            <button
              onClick={connectWallet}
              className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Connect your wallet
								</button>
          </div>

        )}
        {
          currentAccount && <div className="welcome">Welcome {currentAccount} </div>
        }
      </div>
    </div>
  );
}
