import React, { useState, useRef, useContext } from "react";
import EditIcon from "../../assets/edit.svg";
import "./ImageUpload.css";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import { urlContext } from "../../context/context";
import axios from "axios";

const ImageUpload = () => {
  const strDefaultImage = "http://i.pravatar.cc/500?img=7";
  const [strURL, setStrURL] = useState(strDefaultImage);
  const [intHeight, setIntHeight] = useState(0);
  const [intWidth, setIntWidth] = useState(0);
  const [arrDimensions, setArrDimensions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // strImageName, arrThumbSize, strBase64
  const [strImageName, setStrImageName] = useState("");
  const { API_URL } = useContext(urlContext);

  const fileUploadRef = useRef();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const objPayload = {
      strImageName,
      arrThumbSize: arrDimensions,
      strBase64: strURL,
    };

    try {
      if (strURL === strDefaultImage) throw new Error("PLEASE SELECT AN IMAGE");

      const strUrl = API_URL.uploadImage;
      const uploadImg = await axios.post(strUrl, objPayload, {
        headers: {
          "x-access-token": `Bearer ${localStorage.getItem("strAccToken")}`,
        },
      });
      if (uploadImg.data.body?.strMessage === "IMAGE_ADDED_SUCCESS_FULLY") {
        setIsLoading(false);
        setStrURL(strDefaultImage);
        setArrDimensions([]);
        toast.success("IMAGE SAVED SUCCESSFILLY");
      } else {
        setIsLoading(false);
        setStrURL(strDefaultImage);
        setArrDimensions([]);
        toast.error("opps something wrong please login again");
      }
    } catch (err) {
      if (err.errors) err.errors.map((error) => toast.error(error));
      if (err.name === "AxiosError") {
        setIsLoading(false);
        toast.error(err.response.data);
      } else if (err.message === "REVOKED_TOKEN_PROVIDED") {
        // call refresh token
      }
      toast.error(err.message);
    }

    if (isLoading) return <Spinner />;

  };

  const uploadImageDisplay = async (event) => {
    try {
      const uploadedFile = event.target.files[0];
      // const cachedURL = URL.createObjectURL(uploadedFile);
      setStrImageName(uploadedFile["name"]); //to-do add an field to enter name
      const strBase64 = await toBase64(uploadedFile);
      setStrURL(strBase64);
    } catch (error) {
      setStrURL(strDefaultImage);
    }
  };

  const handleSaveDimensions = (e) => {
    intHeight &&
      intWidth &&
      setArrDimensions([...arrDimensions, { intHeight, intWidth }]);
    setIntHeight(0);
    setIntWidth(0);
  };

  return (
    <div className="container">
      <form id="form" encType="multipart/form-data">
        <div className="avatar-upload">
          <div className="avatar-edit">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              name="imageUpload"
              ref={fileUploadRef}
              style={{ display: "none" }}
              onChange={uploadImageDisplay}
            />
            <label htmlFor="imageUpload">
              <img src={EditIcon} alt="Edit" className="align-item-center" />
            </label>
          </div>
          <div className="avatar-preview">
            <div
              id="imagePreview"
              style={{
                backgroundImage: `url(${strURL})`,
              }}
            ></div>
          </div>
        </div>
        <div className="input-fields">
          <label htmlFor="intHeight">
            <input
              type="number"
              name="intHeight"
              value={intHeight || ""}
              onChange={(e) => setIntHeight(e.target.value)}
              placeholder="Enter height for thumbnail"
            />
          </label>
          <label htmlFor="intWidth">
            <input
              type="number"
              value={intWidth || ""}
              onChange={(e) => setIntWidth(e.target.value)}
              placeholder="Enter Width for thumbnail"
              name="intWidth"
            />
          </label>
          <button
            type="button"
            className="save-button"
            onClick={handleSaveDimensions}
          >
            Save Dimensions
          </button>
        </div>
        <button
          type="submit"
          className="upload-button"
          onClick={handleImageUpload}
        >
          <img src={EditIcon} alt="Upload" className="upload-icon" /> Upload
        </button>
      </form>
      <div className="dimensions-list">
        <h4>Saved Dimensions</h4>
        <ul>
          {arrDimensions.map((dim, index) => (
            <li key={index + 1}>
              Height: {dim.intHeight}, Width: {dim.intWidth}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

export default ImageUpload;
