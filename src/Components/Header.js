import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginMethod } from "../createSlice";

function Header() {
  const loginState = useSelector((state) => state.loginData.loginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("loginState");
    if (!Cookies.get("loginState")) {
      toast.success("Logout successfully");
      dispatch(loginMethod(false));
      navigate("/user");
    }
  };
  const currentUser = Cookies.get("loginState")?.split("=")[0].slice(0, 1).toUpperCase();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className="logo"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link className="navLinks" to="/">
                Dashboard
              </Link>
            </Button>
            {loginState ? (
              <>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link className="navLinks" to="/feed">
                    Personal Blogs
                  </Link>
                </Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  <Link className="navLinks" to="/addBlogs">
                    Add Blogs
                  </Link>
                </Button>
              </>
            ) : null}
          </Box>
          <Avatar sx={{ cursor: "pointer", backgroundColor: "orange" }} alt={currentUser || "G"} src="/static/images/avatar/2.jpg">
            {!loginState ? (
              <Link className="userProfile" to="/user">
                {currentUser || "G"}
              </Link>
            ) : null}
          </Avatar>
          {loginState ? (
            <Button className="logOut" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </Container>
      <ToastContainer />
    </AppBar>
  );
}

export default Header;
