import { Button, Descriptions } from "antd";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const ProductInfo = ({ detail, productId }) => {
  const history = useHistory();

  const handleDelete = () => {
    Axios.get(`/api/product/delete?id=${productId}`).then((response) => {
      if (response.data.success) {
        alert("삭제를 완료했습니다.");
        history.push("/");
      } else {
        alert("삭제를 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <Descriptions title="Item Info" bordered>
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Select">{detail.select}</Descriptions.Item>
        <Descriptions.Item label="Date">
          {new Date(detail.createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default ProductInfo;
