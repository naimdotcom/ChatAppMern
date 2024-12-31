import React, { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthImagePattern from "../../../components/common/AuthImagePattern";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login, isLoggingIng, authUser } = useAuthStore();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const formValidation = () => {
    if (!formData.email.trim() && !formData.password.trim())
      return toast.error("All fields are required");

    if (formData.password.length < 6)
      return toast.error("Password must be 6 characters long");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValidation()) return;
    login(formData);
    if (authUser) {
      navigate("/");
    }
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 px-10 mx-auto lg:px-0 lg:grid-cols-2">
      {/* form side */}
      <div className="flex flex-col justify-center w-full space-y-9">
        <div className="text-2xl font-black text-start">Get Started</div>
        <form action="">
          <div className="w-11/12 space-y-5">
            <label className="flex items-center gap-2 input input-bordered">
              <Mail />
              <input
                type="text"
                className="grow"
                id="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </label>
            <label className="flex items-center gap-2 input input-bordered">
              <KeyRound />
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                id="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
              <button className="btn btn-ghost" onClick={handleShowPassword}>
                {!showPassword ? <Eye /> : <EyeOff />}
              </button>
            </label>
            <button
              className="w-full btn btn-active"
              disabled={isLoggingIng}
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-base-content/60">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
      {/* image side */}

      <AuthImagePattern
        title="Login to your account"
        subtitle="Life is a long lesson in humility."
      />
    </div>
  );
}

export default Login;
