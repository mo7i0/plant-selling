import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"; // Using Reactstrap for styling

const User = () => {
  // Sample user data
  const user = {
    name: "Jane Doe",
    bio: "Plant enthusiast and nature lover. Sharing my journey of green thumbs.",
    profileImage: "path/to/profile-image.jpg", // Replace with actual image path
    postsCount: 45,
    followers: 120,
    following: 80,
  };

  return (
    <Card style={{ textAlign: "center", padding: "1rem" }}>
      {/* Profile Image */}
      <img
        src={user.profileImage}
        alt="User profile"
        style={{ borderRadius: "50%", width: "100px", marginBottom: "1rem" }}
      />
      
      <CardBody>
        {/* User Name */}
        <CardTitle tag="h4">{user.name}</CardTitle>
        
        {/* User Bio */}
        <CardText>{user.bio}</CardText>
        
        {/* User Statistics */}
        <CardText>
          <strong>Posts:</strong> {user.postsCount} <br />
          <strong>Followers:</strong> {user.followers} <br />
          <strong>Following:</strong> {user.following}
        </CardText>

        {/* Follow/Unfollow Button */}
        <Button color="primary">Follow</Button>
      </CardBody>
    </Card>
  );
};

export default User;
