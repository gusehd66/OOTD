import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import { categories } from "./Sections/Datas";
import CheckBox from "./Sections/CheckBox";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
  });

  const getProducts = useCallback(async (body) => {
    await axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts((products) => [
            ...products,
            ...response.data.productInfo,
          ]);
        } else {
          setProducts((r) => response.data.productInfo);
        }
        setPostSize((r) => response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  useEffect(() => {
    const body = {
      skip,
      limit,
    };
    getProducts(body);
  }, [skip, limit, getProducts]);

  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} sm={24}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const loadMoreHandler = () => {
    const reSkip = skip + limit;
    const body = {
      skip: reSkip,
      limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const showFilterdResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filter;

    showFilterdResults(newFilters);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          My Room <Icon type="rocket" />{" "}
        </h2>
      </div>

      <CheckBox
        list={categories}
        handleFilters={(filter) => handleFilters(filter, "categories")}
      />

      <Row gutter={(16, 16)}>{renderCards}</Row>
      <br />
      {postSize >= limit && (
        <div style={{ justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
