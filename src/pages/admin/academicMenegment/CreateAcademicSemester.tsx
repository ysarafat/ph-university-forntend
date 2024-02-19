import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constant/global";
import { semesterOptions } from "../../../constant/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingToastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      // creating academic semester add error handle
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: loadingToastId });
      } else {
        toast.success(res.data.message, { id: loadingToastId });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something want wrong", { id: loadingToastId });
    }
  };

  return (
    <Flex justify="center" align="center" style={{}}>
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button size="large" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
