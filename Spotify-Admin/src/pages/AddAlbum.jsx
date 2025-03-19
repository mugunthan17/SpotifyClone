import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

function AddAlbum() {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#00ff5b");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`${url}/api/album/add`,formData);
      if(response.data.success){
        toast.success("Album Added Successfully");
        setName("");
        setDesc("");
        setImage(false);
        setColor("#00ff5b");
      }
      else{
        toast.error("Something went wrong, Try Again");
      }

    } catch (error) {
      toast.error("Error Occured");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self=center border-4 border-gray=400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-col items-start gap-10 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="uploadAreaIcon"
            className="w-24 cursor-pointer"
          ></img>
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Enter Album Name"
          className="bg-transparent outline-green-600 border-2 broder-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          type="text"
          placeholder="Enter Album Description"
          className="bg-transparent outline-green-600 border-2 broder-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Choose Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>
      <button
        className="text-base bg-[#003A10] text-white py-2 font-medium px-10 mb-20 cursor-pointer"
        type="submit"
      >
        Add Album
      </button>
    </form>
  );
}

export default AddAlbum;
