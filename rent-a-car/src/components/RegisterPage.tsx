import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/hooks/storeHooks";
import { signUp } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabaseClient";

interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();
  const dispatch = useAppDispatch();

  const password = watch("password");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const isUserExists = async (email: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error("Kullanıcı kontrolü hatası:", error);
      return false;
    }
    return data && data.length > 0;
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Şifre doğrulama kontrolü
      if (data.password !== data.passwordConfirm) {
        toast.error("Şifreler eşleşmiyor!");
        return;
      }

      const userExists = await isUserExists(data.email);
      if (userExists) {
        toast.error(
          "Bu email adresi ile zaten kayıtlı bir kullanıcı bulunmaktadır. Lütfen giriş yapmayı deneyin."
        );
        return;
      }

      await dispatch(
        signUp({
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        })
      );

      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      reset();
      navigate("/auth/login");
    } catch (error) {
      toast.error("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <input
            {...register("name", { required: "Adınız gerekli" })}
            className="auth-input"
            type="text"
            placeholder="Adınız"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            {...register("surname", { required: "Soyadınız gerekli" })}
            className="auth-input"
            type="text"
            placeholder="Soyadınız"
          />
          {errors.surname && (
            <p className="text-red-500">{errors.surname.message}</p>
          )}
          <input
            {...register("email", {
              required: "Email gerekli",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Geçerli bir email adresi giriniz",
              },
            })}
            className="auth-input"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="relative">
            <input
              {...register("password", {
                required: "Şifre gerekli",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalıdır",
                },
              })}
              className="auth-input pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
            />
            <button
              type="button"
              className="absolute right-2 top-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center w-6 h-6"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="relative">
            <input
              {...register("passwordConfirm", {
                required: "Şifre tekrar gerekli",
                validate: (value) =>
                  value === password || "Şifreler eşleşmiyor",
              })}
              className="auth-input pr-12"
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Şifre Tekrar"
            />
            <button
              type="button"
              className="absolute right-2 top-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center w-6 h-6"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="text-red-500">{errors.passwordConfirm.message}</p>
          )}
          <button className="auth-button" type="submit">
            Kayıt Ol
          </button>
          <button
            className="auth-button"
            type="button"
            onClick={() => navigate("/auth/login")}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
