import React from "react";

const ConnectWallet = ({ currentAccount, connectWallet }) => {
  const { ethereum } = window;
  if (currentAccount || !ethereum) {
    return null
  }

  return (
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
  )
}

export default ConnectWallet;