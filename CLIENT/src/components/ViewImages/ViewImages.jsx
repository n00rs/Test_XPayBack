import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { urlContext } from "../../context/context";
import Banner from "../Banner";
import { Modal, Row, Col } from "react-bootstrap";

const ViewImages = () => {
  const navigate = useNavigate();
  const { API_URL } = useContext(urlContext);
  const [arrImages, setArrImages] = useState([]);
  const [arrThumbnails, setArrThumbnails] = useState([]);

  const openModal = (arrThumbnails) => setArrThumbnails(arrThumbnails);

  const closeModal = () => setArrThumbnails([]);
  const getImages = async () => {
    try {
      let fetchImages = await axios.post(API_URL.getImage, null, {
        headers: {
          "x-access-token": `Bearer ${localStorage.getItem("strAccToken")}`,
        },
      });
      if (fetchImages.data.body?.arrImg?.length)
        setArrImages(fetchImages.data.body?.arrImg);
    } catch (err) {
      if (err.name === "AxiosError") {
        toast.error(err.response.data);
      } else if (err.message === "REVOKED_TOKEN_PROVIDED") {
        // call refresh token
      }
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <>
      <Banner imgSrc={"/images/viewAppBanner.jpg"} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          {arrImages.length ? (
            arrImages.map((objImg, index) => (
              <div className="col-md-4 mb-3" key={index + 1}>
                <div
                  className="card"
                  onClick={() => openModal(objImg?.arrThumbDetails)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={objImg?.strImgBase64}
                    alt="thumbnail"
                    className="card-img-top"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/upload_image")}
              >
                Upload Images
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal to show thubnails */}
      <Modal
        show={!!arrThumbnails.length}
        onHide={closeModal}
        centered
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Thumbnails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {arrThumbnails.map((strBuffer, index) => (
              <Col key={index + 1}>
                <img
                  src={`data:image/jpeg;base64,${strBuffer}`}
                  alt="thumbnail"
                  className="img-thumbnail"
                />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewImages;
