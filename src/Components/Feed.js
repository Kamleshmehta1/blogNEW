import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { editMethod } from "../createSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllPostsQuery, useDeletePostMutation } from "../postFeature";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { data: post, isLoading } = useGetAllPostsQuery({}, { refetchOnMountOrArgChange: true });

  const handleEdit = (id) => {
    Cookies.set("userId", id, { expires: 3600 });
    let Obj = post.find((ele) => ele.id === id);
    dispatch(editMethod({ name: [Obj.name], image: [Obj.image], post: [Obj.post] }));
    navigate("/addBlogs");
  };

  const handleDelete = async (id) => {
    let boolValue = window.confirm("Are you sure you want to delete this blog?");
    if (boolValue) {
      await deletePost(id).then(() => {
        navigate("/feed");
        toast.success("Blog deleted successfully!");
      });
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="postContainer">
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {post.map((ele) => (
          <Grid item xs={12} sm={6} md={4} key={ele.id}>
            {ele.rootUser === Cookies.get("loginState")?.split("=")[0] && (
              <Card sx={{ maxWidth: 345, margin: "40px 0 0 40px" }} key={ele.id}>
                <CardMedia component="img" height="140" image={ele.image} alt="Not Found" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ele.post}
                  </Typography>
                </CardContent>
                <Button className="edit" color="success" onClick={() => handleEdit(ele.id)}>
                  EDIT
                </Button>
                <Button className="delete" color="error" onClick={() => handleDelete(ele.id)}>
                  DELETE
                </Button>
              </Card>
            )}
          </Grid>
        ))}
        <ToastContainer />
      </Grid>
    </div>
  );
}

export default Feed;
