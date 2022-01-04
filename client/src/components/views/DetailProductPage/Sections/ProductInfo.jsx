import { Descriptions } from "antd";

const ProductInfo = ({ detail }) => {
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
      ,
    </div>
  );
};

export default ProductInfo;
