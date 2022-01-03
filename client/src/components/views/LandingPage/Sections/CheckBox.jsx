import { Collapse, Checkbox } from "antd";
import { useState } from "react";

const { Panel } = Collapse;

const CheckBox = ({ list, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    list &&
    list.map((value, index) => (
      <Checkbox
        key={index}
        onChange={() => handleToggle(value._id)}
        checked={checked.indexOf(value._id) === -1 ? false : true}
      >
        <span>{value.name}</span>
      </Checkbox>
    ));

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Category" key="1">
        {renderCheckboxLists()}
      </Panel>
    </Collapse>
  );
};

export default CheckBox;
