import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { handleLogin, useUserStore } from "../../store/user";


type LoginFormValues = {
  username: string;
  password: string;
};

const schema = Yup.object({
  username: Yup.string().required("Username or Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    const { username, password } = data;
    const success = await handleLogin({ username, password });
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-20">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login in you account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Username or Email</label>
            <input
              type="text"
              {...register("username")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Use your Username or Email"
            />

            <div className="min-h-[20px] mt-1">
              <p
                className={`text-red-600 text-sm transition-opacity duration-200 ${
                  errors.username ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.username?.message ?? ""}
              </p>
            </div>
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Use your password"
            />

            <div className="min-h-[20px] mt-1">
              <p
                className={`text-red-600 text-sm transition-opacity duration-200 ${
                  errors.password ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.password?.message ?? ""}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition mt-8 mb-4 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
