import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
      <img
        src={assets.logo}
        alt="bigLogo"
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
      />
      <img
        src={assets.logo_small}
        alt="smallLogo"
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
      />
      <div className="flex flex-col gap-5 mt-10">
        <NavLink to="/add-song" className="flex items-center gap-2.5 text-grey-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
          <img src={assets.add_song} alt="addSongIcon" className="w-5" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>
        <NavLink to="/list-song" className="flex items-center gap-2.5 text-grey-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
          <img src={assets.song_icon} alt="listSongIcon" className="w-5" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>
        <NavLink to="/add-album" className="flex items-center gap-2.5 text-grey-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
          <img src={assets.add_album} alt="addAlbumIcon" className="w-5" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink to="/list-album" className="flex items-center gap-2.5 text-grey-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
          <img src={assets.album_icon} alt="listAlbumIcon" className="w-5" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
