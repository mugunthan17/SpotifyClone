import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayContext.jsx";

function DisplayHome() {

  const {songsData, albumsData} = useContext(PlayerContext)

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              id={item._id}
              name={item.name}
              desc={item.desc}
              img={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Your Favorites</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              id={item.id}
              name={item.name}
              desc={item.desc}
              img={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayHome;
