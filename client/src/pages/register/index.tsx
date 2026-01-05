import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../../api/user";

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

const schema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    const { username, email, password } = data;
    const success = await registerUser({ username, email, password });
    if (success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-20">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a username"
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
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />

            <div className="min-h-[20px] mt-1">
              <p
                className={`text-red-600 text-sm transition-opacity duration-200 ${
                  errors.email ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.email?.message ?? ""}
              </p>
            </div>
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Minimum 8 characters"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
