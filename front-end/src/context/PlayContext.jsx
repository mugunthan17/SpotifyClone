import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  //contexts
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://localhost:3000";

  //api states
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  //states
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "00",
    },
    totalTime: {
      second: "00",
      minute: "00",
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const seekSong = async (event) => {
    audioRef.current.currentTime =
      (event.nativeEvent.offsetX / event.target.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.allSongs);
      setTrack(response.data.allSongs[0]);
    } catch (error) {
      console.log("Error in loading Songs ", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.log("Error in loading Albums ", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setTime({
          currentTime: {
            second: String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, "0"),
            minute: String(Math.floor(audioRef.current.currentTime / 60)).padStart(2, "0"),
          },
          totalTime: {
            second: String(Math.floor(audioRef.current.duration % 60) || 0).padStart(2, "0"),
            minute: String(Math.floor(audioRef.current.duration / 60) || 0).padStart(2, "0"),
          },
        });
  
        // Update seek bar width dynamically
        if (seekBar.current && seekBg.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          seekBar.current.style.width = `${progress}%`;
        }
      };
    }
  }, [track]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
