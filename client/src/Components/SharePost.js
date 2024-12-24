import React, { useState } from "react";
import { Card, CardBody, CardTitle, Input, Button, Form, FormGroup } from "reactstrap"; // Using Reactstrap for styling

const SharePosts = () => {
  // State to hold the content of the new post
  const [postContent, setPostContent] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.trim()) {
      // Here, you would typically send `postContent` to your API or add it to the posts list
      console.log("Post shared:", postContent);
      setPostContent(""); // Clear input after posting
    }
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardBody>
        <CardTitle tag="h5">Share a New Post</CardTitle>
        
        {/* Form for posting */}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {/* Text area for post content */}
            <Input
              type="textarea"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
            />
          </FormGroup>
          
          {/* Share button */}
          <Button color="primary" type="submit" disabled={!postContent.trim()}>
            Share
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SharePosts;
