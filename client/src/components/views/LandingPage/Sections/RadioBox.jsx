import { Collapse, Radio } from "antd";
import { useState } from "react";

const { Panel } = Collapse;

const RadioBox = ({ list, handleFilters }) => {
  const [value, setValue] = useState(0);

  const renderRadioBox = () =>
    list &&
    list.map((value, index) => (
      <Radio key={index} value={value._id}>
        <span>{value.name}</span>
      </Radio>
    ));

  const handleChange = (event) => {
    setValue(event.target.value);
    handleFilters(event.target.value);
  };

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Price" key="1">
        <Radio.Group onChange={handleChange} value={value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};

export default RadioBox;
