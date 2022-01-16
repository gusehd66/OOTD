import React from "react";
import { Typography, Button, Form, Input } from "antd";
import { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

const Categories = [
  { key: 1, value: "Top" },
  { key: 2, value: "Bottom" },
  { key: 3, value: "Shoes" },
  { key: 4, value: "Outer" },
];

const UploadProductPage = ({ user }) => {
  const [images, setImages] = useState([]);
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    categories: 1,
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = () => {
    if (
      !state.title ||
      !state.description ||
      !state.price ||
      !state.categories ||
      !images
    ) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    //서버에 채운 값 request
    const body = {
      //로그인된 id
      writer: user.userData._id,
      images,
      ...state,
    };
    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공 했습니다.");
        history.push("/");
      } else {
        alert("상품 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>옷장 업로드</Title>
      </div>

      <Form onFinish={submitHandler} style={{ padding: "0 1rem" }}>
        <FileUpload refreshFunction={updateImages} />
        <label>이름</label>
        <Input
          onChange={handleChange}
          value={state.title}
          name="title"
          style={{ marginBottom: "20px" }}
        />
        <label>설명</label>
        <TextArea
          onChange={handleChange}
          value={state.description}
          name="description"
        />
        <br />
        <br />
        <label>가격($)</label>
        <Input
          type="number"
          onChange={handleChange}
          value={state.price}
          name="price"
        />
        <br />
        <br />
        <select
          onChange={handleChange}
          value={state.categories}
          name="categories"
        >
          {Categories.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" htmlType="submit">
          확인
        </Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
