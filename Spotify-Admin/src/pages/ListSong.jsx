import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function ListSong() {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      console.log("response:", response.data);

      if (response.data.success) {
        setData(response.data.allSongs);
      }
    } catch (error) {
      console.log("Error fetching songs:", error.message);
      toast.error("Error occurred, try again!");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occurred, try again!");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div className="mb-20">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={item.image} alt="songImg" className="w-12"></img>
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <button
                onClick={() => removeSong(item._id)}
                className="bg-red-600 p-2 rounded-xl justify-center w-fit"
              >
                <img src={assets.deleteBtn} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListSong;
