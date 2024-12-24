import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap"; // Importing Reactstrap for styling

// Sample posts data (could also come from props or state)
const samplePosts = [
  {
    id: 1,
    title: "How to Care for Succulents",
    content: "Succulents are easy to care for if you follow a few simple tips...",
    author: "Plant Lover",
    date: "Nov 10, 2024",
  },
  {
    id: 2,
    title: "5 Indoor Plants for Beginners",
    content: "If you're new to plant care, here are some plants that are easy to maintain...",
    author: "Green Thumb",
    date: "Nov 12, 2024",
  },
  // Add more posts as needed
];

const Posts = () => {
  return (
    <div>
      {samplePosts.map((post) => (
        <Card key={post.id} style={{ margin: "1rem 0" }}>
          <CardBody>
            <CardTitle tag="h5">{post.title}</CardTitle>
            <CardText>
              <small className="text-muted">By {post.author} on {post.date}</small>
            </CardText>
            <CardText>{post.content}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
