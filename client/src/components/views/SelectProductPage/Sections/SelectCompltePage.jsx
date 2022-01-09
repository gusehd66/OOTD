import { useSelector } from "react-redux";

const SelectCompletePage = () => {
  const clothes = useSelector((state) => state.selectItem);
  console.log(clothes);

  return <div>complted</div>;
};

export default SelectCompletePage;
