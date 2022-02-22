import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import { categories, price } from "./Sections/Datas";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeatuer";
import { SkinOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RequestLogin from "../RequestLogin/RequestLogin";
import useAuth from "../../../hooks/auth";
import styled from "styled-components";

const LandingContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
`;

const TitleBox = styled.h2`
  color: white;
  text-shadow: 0 0 3px #fff, 0 0 6px #fff, 0 0 15px #fff, 0 0 30px #ccc;
  text-align: center;
`;

const SearchFeatuerBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px auto;
`;

export const LoadMore = styled.button`
  cursor: pointer;
  color: black;
  width: 300px;
  height: 30px;
  display: block;
  margin: 0 auto;
  border: solid 1px black;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  &:hover {
    background-color: #1b273f;
    box-shadow: 0px 15px 20px rgba(27, 39, 63, 0.4);
    color: whitesmoke;
    transform: translateY(-5px);
  }
`;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
  });
  const [searchItem, setSearchItem] = useState("");
  const user = useAuth(null);

  const getProducts = useCallback((body) => {
    axios
      .post("/api/product/products", body)
      .then((response) => {
        if (response.data.success) {
          if (body.loadMore) {
            setProducts((products) => [
              ...products,
              ...response.data.productInfo,
            ]);
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.postSize);
        } else {
          alert("상품들을 가져오는데 실패 했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  useEffect(() => {
    const body = {
      skip,
      limit,
      user: user?._id || null,
    };
    getProducts(body);
  }, [skip, user, limit, getProducts]);
  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={12}>
        <Link to={`/product/${product._id}`}>
          <Card
            style={{
              padding: "8px",
              width: "100%",
              boxShadow: "5px 5px 5px #666",
            }}
            cover={<ImageSlider images={product.images} />}
          >
            <Meta title={product.title} description={`$${product.price}`} />
          </Card>
        </Link>
      </Col>
    );
  });

  const loadMoreHandler = () => {
    const reSkip = skip + limit;
    const body = {
      skip: reSkip,
      limit,
      loadMore: true,
      user: user?._id || null,
    };

    getProducts(body);
    setSkip(skip);
  };

  const showFilterdResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      user: user?._id || null,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let priceArray = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        priceArray = data[key].array;
      }
    }

    return priceArray;
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filter;

    if (category === "price") {
      const priceValues = handlePrice(filter);
      newFilters["price"] = priceValues;
    }

    showFilterdResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchItem = (newSearchItem) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: newSearchItem,
      user: user?._id || null,
    };
    setSkip(0);
    setSearchItem(newSearchItem);
    getProducts(body);
  };

  return (
    <LandingContainer>
      <TitleBox>
        My Room <SkinOutlined />
      </TitleBox>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={categories}
            handleFilters={(filter) => handleFilters(filter, "categories")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filter) => handleFilters(filter, "price")}
          />
        </Col>
      </Row>

      <SearchFeatuerBox>
        <SearchFeature refreshFuntion={updateSearchItem} />
      </SearchFeatuerBox>

      <Row gutter={[16, 16]}>{user?._id ? renderCards : <RequestLogin />}</Row>
      <br />
      {postSize >= limit && (
        <LoadMore onClick={loadMoreHandler}>더보기</LoadMore>
      )}
    </LandingContainer>
  );
}

export default LandingPage;
