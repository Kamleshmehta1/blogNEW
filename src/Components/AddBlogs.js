import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { editMethod, setInput } from "../createSlice";
import { useLocation } from "react-router-dom";
import { useAddSinglePostMutation, useUpdatePostMutation } from "../postFeature";

function AddBlogs() {
  const navigate = useNavigate();
  const location = useLocation();
  const input = useSelector((state) => state.loginData.input);
  const userId = Cookies.get("userId");
  const [addSinglePost, { isLoading }] = useAddSinglePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const dispatch = useDispatch();

  const getRandomNumber = () => {
    return Math.floor(Date.now() + Math.random(1000)).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Cookies.get("loginState"));
    if (input.name[0] === "" && input.image[0] === "" && input.post[0] === "") {
      toast.error("Kindly enter proper input!");
      dispatch(
        editMethod({
          name: [""],
          image: [""],
          post: [""],
        })
      );
      return;
    }
    await addSinglePost({
      rootUser: Cookies.get("loginState"),
      id: getRandomNumber(),
      name: input.name[0],
      image: input.image[0],
      post: input.post[0],
    }).then(() => {
      toast.success("Post added successfully");
      navigate("/feed");
    });
  };

  const theme = createTheme();

  const handleChange = (e) => {
    dispatch(setInput({ name: e.target.name, value: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("UPDATE");
    console.log(input);
    await updatePost({ rootUser: Cookies.get("loginState"), id: userId, name: input.name[0], image: input.image[0], post: input.post[0] }).then(
      () => {
        navigate("/feed");
        Cookies.remove("userId");
        dispatch(
          editMethod({
            name: [""],
            image: [""],
            post: [""],
          })
        );
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            ADD DATA
          </Typography>
          <Box component="form" onSubmit={userId ? handleUpdate : handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              value={input.name[0]}
              label="Post Name"
              name="name"
              autoComplete="off"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              value={input.image[0]}
              label="Image Link"
              name="image"
              autoComplete="off"
              autoFocus
              onChange={handleChange}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              name="post"
              value={input.post[0]}
              id="textAreaSize"
              required
              placeholder="Enter Post"
              onChange={handleChange}
              style={{ width: "100 %" }}
            />
            <Button type="submit" className="loginInput" variant="contained" sx={{ mt: 3, mb: 2 }}>
              {userId ? "UPDATE DATA" : "ADD DATA"}
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default AddBlogs;
