import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_URL } from "/src/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import formValidate from "/src/utils/formValidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setisSignIn] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleForm = () => {
    setisSignIn(!isSignIn);
  };
  const email = useRef();
  const pass = useRef();
  const name = useRef();
  const handleSubmit = () => {
    const fullName = name.current ? name.current.value : "";
    const msg = formValidate(email.current.value, pass.current.value, fullName);
    setErrormsg(msg);
    if (msg) return null;
    //signin-sign-up logic
    if (!isSignIn) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        pass.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...update the user profile
          updateProfile(user, {
            displayName: fullName,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzR0bIMZ71HVeR5zF4PihQaDvTQQk6bsVERw&s",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrormsg(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrormsg(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrormsg(errorMessage + "-" + errorCode);
        });
    }
  };
  return (
    <div>
      <Header />

      <div className="absolute inset-0 -z-10">
        <img src={BG_URL} alt="banner" className="w-full h-full object-cover" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute 
  bg-black bg-opacity-80 p-6 sm:p-8 md:p-10 
  rounded-xl text-white 
  w-[90%] sm:w-3/4 md:w-1/3 lg:w-1/4
  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
  flex flex-col gap-4 shadow-xl backdrop-blur-sm border border-gray-700"
      >
        <h1 className="font-extrabold text-2xl sm:text-3xl text-center mb-2 sm:mb-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="p-3 rounded-md bg-gray-700 focus:outline-none text-sm sm:text-base"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-3 rounded-md bg-gray-700 focus:outline-none text-sm sm:text-base"
        />
        <input
          type="password"
          placeholder="Password"
          ref={pass}
          className="p-3 rounded-md bg-gray-700 focus:outline-none text-sm sm:text-base"
        />

        {<p className="text-red-400 text-xs sm:text-sm">{errormsg}</p>}

        <button
          className="p-3 mt-2 bg-red-700 rounded-md font-semibold hover:bg-red-800 transition text-sm sm:text-base"
          onClick={handleSubmit}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-xs sm:text-sm text-center mt-2">
          <Link onClick={toggleForm} className="text-blue-400 hover:underline">
            {isSignIn
              ? "New to Netflix? Sign Up now"
              : "Already registered? Sign In now"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
