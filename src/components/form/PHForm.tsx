import { Form } from "antd";
import { FC, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type TPHFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TPHFormConfig;

const PHForm: FC<TPHFormProps> = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}) => {
  const formConfig: TPHFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
