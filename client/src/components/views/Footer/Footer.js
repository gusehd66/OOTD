import { SkinOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FooterContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>
        OOTD by Dongit <SkinOutlined />
      </p>
    </FooterContainer>
  );
}

export default Footer;
