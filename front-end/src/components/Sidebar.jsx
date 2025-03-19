import React from "react";
import { assets } from "./../assets/assets.js";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-[#ffffff26]" onClick={()=>{navigate("/")}}>
          <img src={assets.home_icon} alt="home-icon" className="w-6"></img>
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src={assets.search_icon} alt="search-icon" className="w-6"></img>
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <img src={assets.stack_icon} alt="stack-icon" className="w-8"></img>
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={assets.arrow_icon} alt="arrow-icon" className="w-5"></img>
            <img src={assets.plus_icon} alt="plus-icon" className="w-5"></img>
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 ">
            <h1>Create Your first Playlist</h1>
            <p className="font-light">Enjoy your favorite songs with Playlist</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Podcasts you may Like</h1>
            <p className="font-light">Get quick updates on every New Episodes</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse Podcast</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
