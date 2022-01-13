import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

const FileUpload = ({ refreshFunction }) => {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([
          ...images,
          { image: response.data.filePath, key: response.data.fileKey },
        ]);
        refreshFunction([
          ...images,
          { image: response.data.filePath, key: response.data.fileKey },
        ]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };
  const deleteHandler = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    const deleteKey = newImages.splice(currentIndex, 1)[0];
    axios.post("/api/product/delete", { key: deleteKey.key });

    setImages(newImages);
    refreshFunction(newImages);
  };

  return (
    <UploadContainer>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <UploadButton {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusOutlined />
          </UploadButton>
        )}
      </Dropzone>

      <UploadImageBox>
        {images.map((item, index) => (
          <div onClick={() => deleteHandler(item)} key={index}>
            <UploadImages src={item.image} />
          </div>
        ))}
      </UploadImageBox>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const UploadButton = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UploadImageBox = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;
  margin: 0 20px;
`;
const UploadImages = styled.img.attrs((props) => ({
  src: props.src,
  alt: "img",
}))`
  min-width: 300px;
  width: 300px;
  height: 240px;
  object-fit: contain;
`;

export default FileUpload;
