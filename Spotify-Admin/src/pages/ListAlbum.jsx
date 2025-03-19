import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function ListAlbum() {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
        console.log(data);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  const removeAlbum = async (id) => {

    try {
      
      const response = await axios.post(`${url}/api/album/remove`,{id});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchAlbum();
      }

    } catch (error) {
      toast.error("Error Occurred, Try Again");
    }

  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div>
      <p>All Albums</p>
      <br />
      <div className="mb-20">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={item.image} alt="AlbumImage" className="w-12"></img>
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} />
              <button
                onClick={() => removeAlbum(item._id)}
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

export default ListAlbum;
