import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/hooks/storeHooks";
import { signUp } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = (data: RegisterFormData) => {
    // Şifre doğrulama kontrolü
    if (data.password !== data.passwordConfirm) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    dispatch(
      signUp({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
    );
    reset();
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
          <input
            {...register("password", {
              required: "Şifre gerekli",
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalıdır",
              },
            })}
            className="auth-input"
            type="password"
            placeholder="Şifre"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <input
            {...register("passwordConfirm", {
              required: "Şifre tekrar gerekli",
              validate: (value) => value === password || "Şifreler eşleşmiyor",
            })}
            className="auth-input"
            type="password"
            placeholder="Şifre Tekrar"
          />
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
