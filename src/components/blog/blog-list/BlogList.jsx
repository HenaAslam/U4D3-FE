import React from "react";
import { Col, Row, Container, Button, Form, Alert } from "react-bootstrap";

import BlogItem from "../blog-item/BlogItem";
import { useEffect, useState } from "react";

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);
  const [postBytitle, setPostbytitle] = useState("");
  const [titleResults, settitleResults] = useState([]);
  const fetchPosts = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/blogs/`);
      if (response.ok) {
        let data = await response.json();

        setPosts(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchpostBytitle = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs?title=${postBytitle}`
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        settitleResults(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchpostBytitle();
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Container fluid className=" jumbotron mb-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={10}>
                  <Form.Control
                    className="rounded-pill "
                    type="text"
                    placeholder="Enter title"
                    value={postBytitle}
                    onChange={(event) => setPostbytitle(event.target.value)}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit rounded-pill"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <Row>
        {postBytitle.length > 0 ? (
          titleResults.length > 0 ? (
            titleResults
              .filter((b) =>
                b.title.toLowerCase().includes(postBytitle.toLowerCase())
              )
              .map((post) => (
                <Col
                  key={post.id}
                  md={4}
                  style={{
                    marginBottom: 50,
                  }}
                >
                  <BlogItem key={post.title} {...post} />
                </Col>
              ))
          ) : (
            <Alert variant="warning">No results for the given title</Alert>
          )
        ) : (
          posts.map((post) => (
            <Col
              key={post.id}
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <BlogItem key={post.title} {...post} />
            </Col>
          ))
        )}

        {/* {postBytitle.length > 2 ? (
          titleResults.length > 0 ? (
            titleResults.map((post) => (
              <Col
                md={4}
                style={{
                  marginBottom: 50,
                }}
                key={post.id}
              >
                <BlogItem key={post.title} {...post} />
              </Col>
            ))
          ) : (
            <Alert variant="warning">No results for the given title</Alert>
          )
        ) : (
          posts.map((post) => (
            <Col
              md={4}
              style={{
                marginBottom: 50,
              }}
              key={post.id}
            >
              <BlogItem key={post.title} {...post} />
            </Col>
          ))
        )} */}
      </Row>
    </>
  );
};

export default BlogList;
