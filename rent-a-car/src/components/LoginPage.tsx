import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks/storeHooks";
import { signIn } from "../store/slices/authSlice";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(signIn({ email: data.email, password: data.password }));
      toast.success("Giriş başarılı! Hoş geldiniz.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Giriş başarısız. Email veya şifrenizi kontrol edin.");
    }
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
        <div className="relative ">
          <input
            {...register("password")}
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
          />
          <button
            type="button"
            className="absolute left-48 top-3 "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        </div>
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
