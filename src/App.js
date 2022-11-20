import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import User from "./Components/User/User";
import Page from "./Components/User/Page";
import Feed from "./Components/Feed";
import AddBlogs from "./Components/AddBlogs";
import Home from "./Components/Home";
import { useSelector } from "react-redux";

function App() {
  const loginState = useSelector((state) => state.loginData.loginState);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {loginState ? (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/addBlogs" element={<AddBlogs />} />
          </>
        ) : (
          <Route path="/user" element={<User />}>
            <Route path="login" element={<Page />} />
            <Route path="signUp" element={<Page />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
