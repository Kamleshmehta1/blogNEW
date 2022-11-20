import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllPostsQuery } from "../postFeature";

function Home() {
  const { data: post, isLoading } = useGetAllPostsQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="postContainer">
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {post.map((ele) => (
          <Grid item xs={12} sm={6} md={4} key={ele.id}>
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
            </Card>
          </Grid>
        ))}
        <ToastContainer />
      </Grid>
    </div>
  );
}

export default Home;
