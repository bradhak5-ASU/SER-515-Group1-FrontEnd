import React, { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toastNotify } from "@/lib/utils";

import { emailRegex, nameRegex, userNameRegex } from "@/lib/constants";

const initialState = {
  name: "",
  email: "",
  userName: "",
  password: "",
};

const LoginPage = ({ type }) => {
  const { login } = useAuth();

  const [userData, setUserData] = useState({
    ...initialState,
    email: localStorage.getItem("userEmail") || "",
  });
  const [rePassword, setRePassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true" || false
  );
  const [errorState, setErrorState] = useState(initialState);

  const handleRememberMe = (checked) => {
    if (checked) {
      setRememberMe(true);
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userEmail", userData?.email);
    } else {
      setRememberMe(false);
      localStorage.removeItem("userEmail");
      localStorage.removeItem("rememberMe");
    }
  };

  const checkValidation = () => {
    const errors = {
      name: "",
      email: "",
      userName: "",
      password: "",
      rePassword: "",
    };

    if (!userData?.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!userData?.password) {
      errors.password = "Password is required";
    } else if (userData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (type === "sign-up") {
      if (!userData?.name) {
        errors.name = "Name is required";
      } else if (!nameRegex.test(userData.name)) {
        errors.name = "Name should contain only letters and spaces";
      }

      if (!userData?.userName) {
        errors.userName = "User name is required";
      } else if (!userNameRegex.test(userData.userName)) {
        errors.userName = "User name must be alphanumeric (no spaces)";
      }

      if (!rePassword) {
        errors.rePassword = "Please re-enter your password";
      } else if (userData.password !== rePassword) {
        errors.rePassword = "Passwords do not match";
      }
    }

    setErrorState(errors);

    const firstError = Object.values(errors).find((e) => e);
    if (firstError) {
      toastNotify(firstError, "error");
      return false;
    }

    return true;
  };
  const handleLoginSignup = async () => {
    const isValid = checkValidation();
    if (!isValid) return;

    const formData = {
      email: userData?.email,
      password: userData?.password,
      user_name: userData?.userName,
    };

    try {
      if (type === "login") {
        // Call login API
        const loginFormData = new FormData();
        loginFormData.append("username", userData?.email);
        loginFormData.append("password", userData?.password);
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/token`,
          loginFormData
        );
        login(data.access_token);
        window.location.href = "/dashboard";
      } else {
        // Call signup API
        await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, formData);
        toastNotify("Account created successfully! Please log in.", "success");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      toastNotify(error?.response?.data?.detail || error?.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm mx-auto shadow-[0_0_100px_rgba(0,0,0,0.2)]">
        <CardHeader className="text-center space-y-4 pt-12">
          <div className="flex justify-center items-center space-x-2">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 10a5.995 5.995 0 01-3 5.197"
              />
            </svg>
            <span className="text-3xl font-bold text-blue-800 tracking-wider">
              COLLABRYX
            </span>
          </div>

          <CardTitle className="text-2xl">
            {type === "login" ? "Log in to continue" : "Create an account"}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-12 pb-12">
          <div className="space-y-3">
            {/* Avatar Placeholder */}
            {type === "login" && (
              <div className="flex justify-center">
                <div className="w-28 h-28 bg-gray-700 rounded-full flex items-center justify-center">
                  <UserCircle2 className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            )}

            {type === "sign-up" && (
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={userData?.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
                {errorState.name && (
                  <p className="text-red-500 text-sm">{errorState.name}</p>
                )}
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={userData?.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              {errorState.email && (
                <p className="text-red-500 text-sm">{errorState.email}</p>
              )}
            </div>

            {type === "sign-up" && (
              <div className="space-y-1">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter Prefered User Name"
                  value={userData?.userName}
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                />
                {errorState.userName && (
                  <p className="text-red-500 text-sm">{errorState.userName}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="password">
                {type === "sign-up" ? "Create Password" : "Password"}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={userData?.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {errorState.password && (
                <p className="text-red-500 text-sm">{errorState.password}</p>
              )}
            </div>

            {type === "sign-up" && (
              <div className="space-y-1">
                <Label htmlFor="rePassword">Re-enter Password</Label>
                <Input
                  id="rePassword"
                  type="password"
                  placeholder="Re-Enter Your Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                {errorState.rePassword && (
                  <p className="text-red-500 text-sm">
                    {errorState.rePassword}
                  </p>
                )}
              </div>
            )}

            {type === "login" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  value="remember-me"
                  checked={rememberMe}
                  onCheckedChange={handleRememberMe}
                />
                <Label htmlFor="remember-me" className="font-normal text-sm">
                  Remember me
                </Label>
              </div>
            ) : null}

            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={handleLoginSignup}
            >
              {type === "login" ? "Log In" : "Sign Up"}
            </Button>
          </div>

          {type === "login" ? (
            <div className="mt-20 text-center text-sm">
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-black underline"
              >
                Forgot Password
              </a>
              <p className="mt-2 text-gray-600">
                New User?{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-black hover:text-gray-700 underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          ) : (
            <div className="mt-20 text-center text-sm">
              <a
                href="/login"
                className="font-medium text-gray-600 hover:text-black underline"
              >
                Existing User?{" "}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
