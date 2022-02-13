import { Button, Descriptions } from "antd";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UpdateModal from "../../../utils/UpdateModal";
import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductInfo = ({ detail, productId }) => {
  const history = useHistory();
  const handleDelete = () => {
    const confirm = window.confirm("삭제하시겠습니까?");
    confirm &&
      Axios.post(`/api/product/delete?id=${productId}`, {
        key: detail.images[0].key,
      }).then((response) => {
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
        <Descriptions.Item label="Favorite">
          {detail.favorite?.length}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {new Date(detail.createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <ButtonBox>
        <UpdateModal detail={detail} />
        <Button onClick={handleDelete} type="primary" danger>
          Delete
        </Button>
      </ButtonBox>
    </div>
  );
};

export default ProductInfo;
