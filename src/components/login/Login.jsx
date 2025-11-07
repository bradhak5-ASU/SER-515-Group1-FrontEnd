import React from "react";

// Import the necessary ShadCN UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Import an icon from lucide-react (make sure to install it: npm install lucide-react)
import { UserCircle2 } from "lucide-react";

const LoginPage = ({ type }) => {
  const handleRememberMe = (checked) => {
    if (checked) {
      // Logic to remember the user (e.g., set a cookie or local storage)
    } else {
      // Logic to forget the user
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm mx-auto shadow-[0_0_100px_rgba(0,0,0,0.25)]">
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
          <div className="space-y-6">
            {/* Avatar Placeholder */}
            <div className="flex justify-center">
              <div className="w-28 h-28 bg-gray-700 rounded-full flex items-center justify-center">
                <UserCircle2 className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter Your Email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {type === "sign-up" ? "Create Password" : "Password"}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>

            {type === "sign-up" && (
              <div className="space-y-2">
                <Label htmlFor="rePassword">Re-enter Password</Label>
                <Input
                  id="rePassword"
                  type="password"
                  placeholder="Re-Enter Your Password"
                />
              </div>
            )}

            {type === "login" ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  value="remember-me"
                  onCheckedChange={handleRememberMe}
                />
                <Label htmlFor="remember-me" className="font-normal text-sm">
                  Remember me
                </Label>
              </div>
            ) : null}

            <Button className="w-full bg-black text-white hover:bg-gray-800">
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
