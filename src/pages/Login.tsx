import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const defaultValues = {
    userId: "A-0001",
    password: "123456",
  };
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged in", { id: toastId, duration: 2000 });
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="UserID:" />

        <PHInput type="password" name="password" label="password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
