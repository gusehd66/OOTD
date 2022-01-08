import { Button, Descriptions } from "antd";
import Axios from "axios";

const ProductInfo = ({ detail, productId }) => {
  const handleDelete = () => {
    Axios.delete(`/api/product/delete?id=${productId}`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
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
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default ProductInfo;
