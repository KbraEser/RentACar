import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/storeHooks";
import { signIn } from "../store/slices/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  return (
    <div className="container mx-auto ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <input
          {...register("email")}
          className=" auth-input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="auth-input"
          type="password"
          placeholder="Şifre"
        />
        <button className=" auth-button" type="submit">
          Giriş Yap
        </button>
        <button
          className="auth-button"
          type="button"
          onClick={() => navigate("/auth/register")}
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
