import React, { useContext } from "react";
import { assets } from "./../assets/assets.js";
import { PlayerContext } from "../context/PlayContext.jsx";

function Player() {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong
  } = useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="song-img"></img>
        <div className="">
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 ">
          <img
            src={assets.shuffle_icon}
            alt="shuffleIcon"
            className="w-4 cursor-pointer"
          ></img>
          <img
            onClick={previous}
            src={assets.prev_icon}
            alt="prevIcon"
            className="w-4 cursor-pointer"
          ></img>
          {playStatus ? (
            <img
              src={assets.pause_icon}
              alt="pauseIcon"
              className="w-4 cursor-pointer"
              onClick={pause}
            ></img>
          ) : (
            <img
              src={assets.play_icon}
              alt="playIcon"
              className="w-4 cursor-pointer"
              onClick={play}
            ></img>
          )}

          <img
            onClick={next}
            src={assets.next_icon}
            alt="nextIcon"
            className="w-4 cursor-pointer"
          ></img>
          <img
            src={assets.loop_icon}
            alt="loopIcon"
            className="w-4 cursor-pointer"
          ></img>
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg} onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-[#1db954] rounded-full"
            ></hr>
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img src={assets.plays_icon} alt="playsIcon" className="w-4"></img>
        <img src={assets.mic_icon} alt="micIcon" className="w-4"></img>
        <img src={assets.queue_icon} alt="queueIcon" className="w-4"></img>
        <img src={assets.speaker_icon} alt="speakerIcon" className="w-4"></img>
        <img src={assets.volume_icon} alt="volumeIcon" className="w-4"></img>
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img
          src={assets.mini_player_icon}
          alt="miniPlayerIcon"
          className="w-4"
        ></img>
        <img src={assets.zoom_icon} alt="zoomIcon" className="w-4"></img>
      </div>
    </div>
  ) : null
}

export default Player;
