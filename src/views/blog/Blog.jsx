import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Spinner,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [newComment, setNewComment] = useState({
    author: "",
    text: "",
  });
  const { id } = params;
  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewComment();
  };
  const sendNewComment = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs/${id}/comments`,
        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchPost(id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async (id) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/blogs/` + id);
      if (response.ok) {
        let data = await response.json();

        setBlog(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        {blog ? (
          <div className="blog-details-root">
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} sm={6}>
                  <Image className="blog-details-cover" src={blog.cover} />
                </Col>
              </Row>

              <h1 className="blog-details-title">{blog.title}</h1>
              <h4>{blog.category}</h4>

              <div className="blog-details-container">
                <div className="blog-details-author">
                  <BlogAuthor {...blog.author} />
                </div>
                <div className="blog-details-info">
                  <div>{blog.createdAt}</div>
                  <div>
                    {blog.readTime?.value} {blog.readTime?.unit} read
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  </div>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
              <h5 className="mt-5">Comments</h5>

              {/* {blog.comments ? (
                <ListGroup>
                  {blog.comments.length > 0 ? (
                    blog.comments.map((c) => (
                      <ListGroupItem key={c.id}>
                        {c.text} -- {c.author}
                      </ListGroupItem>
                    ))
                  ) : (
                    <p>No comments yet</p>
                  )}
                </ListGroup>
              ) : (
                <Spinner animation="border" variant="success" />
              )} */}
              <h6 className="mt-5">Add new comment</h6>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="blog-form" className="mt-3">
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    size="md"
                    className="w-50"
                    placeholder="name"
                    value={newComment.author}
                    onChange={(e) => {
                      setNewComment({
                        ...newComment,
                        author: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                  <Form.Label>comment</Form.Label>
                  <Form.Control
                    size="md"
                    className="w-50"
                    placeholder="comment"
                    value={newComment.text}
                    onChange={(e) => {
                      setNewComment({
                        ...newComment,
                        text: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Button type="submit" size="sm" variant="dark" className="mt-2">
                  Submit
                </Button>
              </Form>
            </Container>
          </div>
        ) : (
          <div>loading</div>
        )}
      </>
    );
  }
};

export default Blog;
