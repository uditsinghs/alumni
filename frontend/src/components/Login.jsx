import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
const Login = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const getValueHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form className="w-full max-w-sm bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl flex flex-col gap-6">
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
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={getValueHandler}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={getValueHandler}
              className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all pr-10"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <Button
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 rounded-md py-2"
            variant="secondary"
          >
            Login
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
