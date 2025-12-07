import React, { useEffect, useState } from "react";
import { LOGO } from "/src/utils/constants";
import { SUPPORTED_LANG} from "../utils/constants";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {  LogOutIcon, SearchIcon } from "lucide-react";
import { toggleGeminiSearch } from "../utils/geminiSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gemini = useSelector((store) => store.gemini.showPage);
  const [showMenu, setShowMenu] = useState(false);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelGptsearch = () => {
    dispatch(toggleGeminiSearch());
  };
  const handelLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex flex-col md:flex-row justify-between">
      {/* Logo */}
      <Link to="/">
        <img src={LOGO} alt="logo" className="w-44 mx-auto md:mx-0" />
      </Link>

      {/* User Section */}
      {user && (
        <div className="flex items-center space-x-4 relative">
          {gemini && (
            <select
              className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer hover:bg-gray-700 transition duration-200"
              onClick={handelLanguage}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="flex items-center gap-2 m-3 px-4 py-2 text-white rounded-xl font-semibold shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer"
            onClick={handelGptsearch}
          >
            {gemini === false && <SearchIcon size={16} />}
            <span>{gemini ? "Home Page" : "GPT Search"}</span>
          </button>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1"
            >
              <img
                src={user.photoURL}
                alt="user avatar"
                className="w-10 h-10 border-2 rounded-full object-cover"
              />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400 flex items-center"
                  onClick={handleSignout}
                >
                  <LogOutIcon size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
