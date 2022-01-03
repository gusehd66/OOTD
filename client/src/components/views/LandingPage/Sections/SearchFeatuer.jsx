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
      placeholder="input search text"
      allowClear
      onChange={searchHandler}
      value={searchItem}
      style={{ width: 200 }}
    />
  );
};

export default SearchFeature;
