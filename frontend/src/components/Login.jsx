import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { loginUser } from "@/features/auth/authService";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValueHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await loginUser(input);

      dispatch(login(data.user));
      if (data.success) {
        setIsLoading(false);
        toast.success(data?.message || "login success");
        setInput({
          name: "",
          email: "",
          password: "",
        });
      }
      navigate("/");
    } catch (error) {
      setIsError(true);
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  if (isError) return <p>something went wrong</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login to Get Access
        </h1>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={getValueHandler}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={getValueHandler}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={getValueHandler}
              className="pr-10"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <Button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white"
          >
            {isLoading ? (
              <Loader2 className="mr-2 animate-spin w-2 " />
            ) : (
              "Login"
            )}

            <ChevronRight size={20} />
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
