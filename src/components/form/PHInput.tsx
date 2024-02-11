import { Input } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";
type TPHInput = {
  type: string;
  name: string;
  label?: string;
};
const PHInput: FC<TPHInput> = ({ type, name, label }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;
