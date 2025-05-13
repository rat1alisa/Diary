import React, { useState } from "react";
import { LoginForm } from "@features/auth/ui/LoginForm";
import { RegistrationForm } from "@features/auth/ui/RegistrationForm";
import './LoginPage.scss'
import { Header } from "@widgets/ui/header/Header";

export const LoginPage = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <Header />
      <div>
      <div className={containerClass} id="container">
        <div className="block12">
          <div className="block1">
          <LoginForm />
          </div>
          <div className="block2" >
            <RegistrationForm />
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/*return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 shadow rounded bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <LoginForm />
        <RegistrationForm />
      </div>
    </div>

  );*/

