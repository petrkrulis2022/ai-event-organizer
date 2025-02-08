"use client";

import React, { useState, useEffect, useRef } from "react";
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
import ImageSvg from "./svg/Image";
import OnchainkitSvg from "./svg/OnchainKit";
import Logo from "./svg/Logo";

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

const blockchains = [
  "Ethereum",
  "Optimism",
  "Megaeth",
  "Arbitrum",
  "Base",
  "BNB Chain",
  "Polygon",
];

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function App() {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [hackathonIncluded, setHackathonIncluded] = useState(false);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [twitterTags, setTwitterTags] = useState("");
  const [details, setDetails] = useState("");
  const [submitToSocialMedia, setSubmitToSocialMedia] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => {
          if (locationInputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
              locationInputRef.current
            );
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              if (place.geometry) {
                setLocation(place.formatted_address || "");
              }
            });
          }
        };
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleBlockchainChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const selectedValues: string[] = [];
    for (const option of Array.from(options)) {
      if (option.selected) {
        selectedValues.push(option.value);
      }
    }
    setSelectedBlockchains(selectedValues);
  };

  const handleSocialMediaSubmit = () => {
    // Call the API for the social media agent
    console.log("Submitting to social media agent with tags:", twitterTags);
  };

  const handleHackathonSubmit = () => {
    // Call the API for the hackathon agent
    console.log("Submitting to hackathon agent");
  };

  const handleMainSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Call the API for the main agent
    console.log("Submitting to main agent with event details:", {
      eventName,
      location,
      startDate,
      endDate,
      budget,
      currency,
      hackathonIncluded,
      selectedBlockchains,
      twitterTags,
      details,
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-background text-black">
      <header className="flex justify-between items-center pt-4 pr-4 pl-4">
        <div className="flex items-center">
          <Logo className="w-10 h-10 mr-2" />
          <span className="text-xl font-semibold">AI Eth Local Organizer</span>
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
        <div className="max-w-4xl w-full p-4">
          <h2 className="text-xl font-semibold mb-4">
            Add New Eth Local Event
          </h2>
          <form onSubmit={handleMainSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Type location"
                className="w-full p-2 border rounded"
                ref={locationInputRef}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Required Budget
              </label>
              <div className="flex">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget"
                  className="w-full p-2 border rounded"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="p-2 border rounded ml-2"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Hackathon Included
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={hackathonIncluded}
                  onChange={(e) => setHackathonIncluded(e.target.checked)}
                  className="mr-2"
                />
                <span>Yes</span>
                <button
                  type="button"
                  onClick={handleHackathonSubmit}
                  className={`bg-blue-500 text-white px-4 py-2 rounded ml-4 ${
                    hackathonIncluded ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!hackathonIncluded}
                >
                  SEND TO HACK AGENT
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Blockchains Involved
              </label>
              <select
                multiple
                value={selectedBlockchains}
                onChange={handleBlockchainChange}
                className="w-full p-2 border rounded"
              >
                {blockchains.map((blockchain) => (
                  <option
                    key={blockchain}
                    value={blockchain}
                    style={{
                      backgroundColor: selectedBlockchains.includes(blockchain)
                        ? "lightblue"
                        : "white",
                    }}
                  >
                    {blockchain}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Twitter Tags
              </label>
              <input
                type="text"
                value={twitterTags}
                onChange={(e) => setTwitterTags(e.target.value)}
                placeholder="Enter Twitter tags"
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={submitToSocialMedia}
                  onChange={(e) => setSubmitToSocialMedia(e.target.checked)}
                  className="mr-2"
                />
                <span>Submit to Social Media Agent</span>
                <button
                  type="button"
                  onClick={handleSocialMediaSubmit}
                  className={`bg-blue-500 text-white px-4 py-2 rounded ml-4 ${
                    submitToSocialMedia && twitterTags
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!submitToSocialMedia || !twitterTags}
                >
                  SEND TO MARKETING AGENT
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit to Main Agent
            </button>
          </form>
        </div>
        <div className="flex flex-col items-end mt-4">
          <div className="w-16 h-16 mb-4">
            <ImageSvg className="w-full h-full" />
          </div>
          <div className="mb-4">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="dark:text-white text-black w-16 h-16" />
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="max-w-2xl w-full"></div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="max-w-2xl w-full">
              <div className="flex flex-row justify-between mt-4">
                <div className="w-full flex flex-col items-center">
                  <p className="font-semibold mb-2 text-center">
                    Explore templates
                  </p>
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
                <div className="w-full flex flex-col items-center">
                  <p className="font-semibold mb-2 text-center">
                    Explore components
                  </p>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
