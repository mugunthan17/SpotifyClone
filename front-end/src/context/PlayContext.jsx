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
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        const currentSeconds = Math.floor(audioRef.current.currentTime % 60);
        const currentMinutes = Math.floor(audioRef.current.currentTime / 60);
        const totalSeconds = Math.floor(audioRef.current.duration % 60);
        const totalMinutes = Math.floor(audioRef.current.duration / 60);

        setTime({
          currentTime: {
            second: currentSeconds.toString().padStart(2, "0"), // Pad with 0
            minute: currentMinutes.toString().padStart(2, "0"), // Pad with 0
          },
          totalTime: {
            second: totalSeconds.toString().padStart(2, "0"), // Pad with 0
            minute: totalMinutes.toString().padStart(2, "0"), // Pad with 0
          },
        });
      };
    }, 1000);
  }, [audioRef]);

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
