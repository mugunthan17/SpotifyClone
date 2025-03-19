import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "./../assets/assets.js";
import { PlayerContext } from "../context/PlayContext";
import { useState } from "react";
import { useEffect } from "react";

function DisplayAlbum({album}) {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId , albumsData , songsData} = useContext(PlayerContext);

  useEffect(()=>{
    albumsData.map((item)=>{
      if(item._id === id){
        setAlbumData(item);
      }
    })
  },[])

  function getTotalDuration(songs) {
    let totalSeconds = songs.reduce((acc, song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}hrs ${minutes}mins ${seconds}secs`;
  }

  const filteredSongs = songsData.filter((song) => song.album === albumData.name)

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end">
        <img
          src={albumData.image}
          alt="albumImage"
          className="w-48 rounded"
        ></img>
        <div className="flex flex-col">
          <p>Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              alt="spotifyLogo"
              className="inline-block w-5"
            ></img>
            <b> Spotify</b> &#8226; 1,178,189 likes &#8226;{" "}
            <b>{filteredSongs.length} Songs,</b> about {getTotalDuration(filteredSongs)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4 ">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date added</p>
        <img
          src={assets.clock_icon}
          alt="clockIcon"
          className="m-auto w-4"
        ></img>
      </div>
      <hr />
      {songsData.filter((item)=>item.album === album.name).map((item, index) => (
        <div
          onClick={() => {
            playWithId(item._id);
          }}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] curosor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7] ">{index + 1}</b>
            <img
              src={item.image}
              alt="songImg"
              className="inline w-10 mr-5"
            ></img>
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  ) : null;
}

export default DisplayAlbum;
