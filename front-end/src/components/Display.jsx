import React, { useEffect } from "react";
import DisplayHome from "./DisplayHome";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
import { useRef } from "react";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayContext";

function Display() {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((elem) => elem._id === albumId).bgColor
      : "#1db954";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((e) => e._id === albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
}

export default Display;
