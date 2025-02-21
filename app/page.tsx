"use client";

import React, { useState } from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import ArrowSvg from "./svg/ArrowSvg";
import OnchainkitSvg from "./svg/OnchainKit";
import logoImage from "./logo.png"; // Corrected import path

const components = [
  {
    name: "Transaction",
    url: "https://onchainkit.xyz/transaction/transaction",
  },
  { name: "Swap", url: "https://onchainkit.xyz/swap/swap" },
  { name: "Checkout", url: "https://onchainkit.xyz/checkout/checkout" },
  { name: "Wallet", url: "https://onchainkit.xyz/wallet/wallet" },
  { name: "Identity", url: "https://onchainkit.xyz/identity/identity" },
];

const templates = [
  { name: "NFT", url: "https://github.com/coinbase/onchain-app-template" },
  {
    name: "Commerce",
    url: "https://github.com/coinbase/onchain-commerce-template",
  },
  { name: "Fund", url: "https://github.com/fakepixels/fund-component" },
];

export default function App() {
  const [hackathonIncluded, setHackathonIncluded] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [tweet, setTweet] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [eventLogo, setEventLogo] = useState<string | null>(null);

  const handleSendToOrchestra = () => {
    // Simulate sending event details to Orchestra and receiving the event logo
    setTimeout(() => {
      setEventLogo(logoImage.src); // Using the src property of the imported image
    }, 1000);
  };

  const handleChatKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      // Handle sending the chat message
      console.log("Chat message sent:", chatMessage);
      setChatMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-g-light-purple text-g-blue">
      <header className="flex justify-between items-center pt-4 pr-4 pl-4 bg-g-blue text-g-white">
        <div className="flex items-center">
          <img
            src={logoImage.src} // Access the src property of the imported image
            alt="AI Event Orchestra Logo" // Add alt text for accessibility
            className="w-16 h-16 mr-2" // Adjust size and margin as needed
          />
          <span className="text-xl font-semibold">AI Event Orchestra</span>
        </div>
        <div className="wallet-container">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start pt-4">
        {/* Main content goes here */}
        <div className="w-full max-w-2xl p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Set your Event Details
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Event Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="ml-4">
              {eventLogo ? (
                <img src={eventLogo} alt="Event Logo" className="w-16 h-16" />
              ) : (
                <div className="w-16 h-16 border rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Event Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-g-yellow text-g-blue rounded mb-4"
            onClick={handleSendToOrchestra}
          >
            Send to Orchestra
          </button>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={hackathonIncluded}
              onChange={(e) => setHackathonIncluded(e.target.checked)}
            />
            <label className="text-sm font-medium">Hackathon Included</label>
          </div>
          <button
            className={`p-2 ${
              hackathonIncluded ? "bg-g-medium-blue" : "bg-gray-500"
            } text-g-white rounded mb-4`}
            disabled={!hackathonIncluded}
          >
            Send to Hackathon Agent
          </button>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tweet</label>
            <textarea
              className="w-full p-2 border rounded"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </div>
          <button
            className={`p-2 ${
              tweet ? "bg-g-medium-blue" : "bg-gray-500"
            } text-g-white rounded mb-4`}
            disabled={!tweet}
          >
            Send to Social Media Agent
          </button>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Chat with Agent
            </label>
            <textarea
              className="w-full p-2 border rounded"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleChatKeyPress}
            />
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center mt-8">
        <div className="flex flex-row justify-between w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="dark:text-white text-black w-16 h-16" />
            </a>
          </div>
        </div>
      </footer>

      {/* Ensure these sections are at the bottom */}
      <div className="mt-auto flex flex-row justify-center space-x-8">
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2 text-center">Explore components</p>
          <ul className="list-disc pl-5 space-y-2 inline-block text-left">
            {components.map((component, index) => (
              <li key={index}>
                <a
                  href={component.url}
                  className="hover:underline inline-flex items-center dark:text-white text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {component.name}
                  <ArrowSvg />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2 text-center">Explore templates</p>
          <ul className="list-disc pl-5 space-y-2 inline-block text-left">
            {templates.map((template, index) => (
              <li key={index}>
                <a
                  href={template.url}
                  className="hover:underline inline-flex items-center dark:text-white text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {template.name}
                  <ArrowSvg />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
