import React, { useState, FC } from "react";
import { DemoProps } from "./demo.d";
import "./index.less";

const Demo: FC<DemoProps> = (props) => {
  const { name } = props;
  const [count, setCount] = useState(0);
  return (
    <div className="basic">
      <div>{name}</div>
      <div>{count}</div>
    </div>
  );
};

export default Demo;
