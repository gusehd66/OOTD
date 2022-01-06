import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import { categories, price } from "./Sections/Datas";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeatuer";
import { useSelector } from "react-redux";

function LandingPage(props) {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
  });
  const [searchItem, setSearchItem] = useState("");

  const user = useSelector((state) => state.user.userData);

  const getProducts = useCallback(async (body) => {
    await axios.post("/api/product/products", body).then((response) => {
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
      <Col key={index} lg={6} md={8} sm={24}>
        <Card
          style={{ margin: "10px", padding: "8px" }}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
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
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          My Room <Icon type="rocket" />{" "}
        </h2>
      </div>

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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFuntion={updateSearchItem} />
      </div>

      <Row gutter={(16, 16)}>
        {user?._id ? renderCards : <h2>로그인을 해주세요</h2>}
      </Row>
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
