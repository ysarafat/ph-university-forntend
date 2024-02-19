import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingToastId = toast.loading("Creating...");
    try {
      const res = (await addAcademicFaculty(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: loadingToastId });
      } else {
        toast.success(res.data.message, { id: loadingToastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: loadingToastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="name" type="text" label="Faculty Name" />
          <Button htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
