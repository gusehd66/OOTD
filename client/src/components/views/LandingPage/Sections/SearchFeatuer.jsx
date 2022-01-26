import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

const SearchFeature = ({ refreshFuntion }) => {
  const [searchItem, setSearchItem] = useState("");

  const searchHandler = (event) => {
    setSearchItem(event.currentTarget.value);
    refreshFuntion(event.currentTarget.value);
  };

  return (
    <Search
      placeholder="Search Items"
      allowClear
      onChange={searchHandler}
      value={searchItem}
      style={{ width: 200, boxShadow: "5px 5px 5px #666" }}
    />
  );
};

export default SearchFeature;
