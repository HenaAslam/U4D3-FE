import React from "react";
import { Col, Row } from "react-bootstrap";

import BlogItem from "../blog-item/BlogItem";
import { useEffect, useState } from "react";

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      let response = await fetch("http://localhost:3001/blogs");
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setPosts(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Row>
      {posts &&
        posts.map((post) => (
          <Col
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
