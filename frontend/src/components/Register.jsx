import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/features/auth/authService";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumni",
    batch: "",
    branch: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await registerUser(formData);
      if (data.success) {
        setIsLoading(false);
        toast.success(data?.message || "login success");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "alumni",
          batch: "",
          branch: "",
        });
      }
      if (data.newUser.role === "alumni") {
        navigate("/message");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };
  if (isError) return <p>something went wrong</p>;
  return (
    <div className="flex min-h-screen  items-center w-full justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            required
          />

          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            required
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            required
          />

          <div>
            <Label className="mb-1 block text-sm text-gray-600">
              Select Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Student</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            placeholder="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />

          <Input
            type="text"
            placeholder="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />

          <Button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 rounded-md py-2"
            variant="secondary"
          >
            {isLoading ? (
              <Loader2 className="mr-2 animate-spin w-2 " />
            ) : (
              "Register"
            )}
            <ChevronRight size={20} />
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
