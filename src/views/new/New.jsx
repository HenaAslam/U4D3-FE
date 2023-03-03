// import { convertToHTML } from "draft-convert";
// import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [newBlog, setNewBlog] = useState({
    category: "",
    title: "",

    cover: "",
    content: "",
    readTime: {
      value: 1,
      unit: "",
    },

    author: { name: "", avatar: "" },
  });
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  // const [html, setHTML] = useState(null);
  // useEffect(() => {
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setHTML(html);
  // }, [editorState]);

  const sendNewBlog = async () => {
    try {
      let response = await fetch("http://localhost:3001/blogs/", {
        method: "POST",
        body: JSON.stringify(newBlog),

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        alert("blog added");
      } else {
        alert("problem posting blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();

          sendNewBlog();
        }}
      >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                title: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Category"
            value={newBlog.category}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                category: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Cover"
            value={newBlog.cover}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                cover: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Read time value</Form.Label>
          <Form.Control
            size="lg"
            placeholder="read time value"
            value={newBlog.readTime.value}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                readTime: { ...newBlog.readTime, value: e.target.value },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Read time value unit</Form.Label>
          <Form.Control
            size="lg"
            placeholder="unit"
            value={newBlog.readTime.unit}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                readTime: { ...newBlog.readTime, unit: e.target.value },
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>author name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="name"
            value={newBlog.author.name}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                author: { ...newBlog.author, name: e.target.value },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>author avatar</Form.Label>
          <Form.Control
            size="lg"
            placeholder="avatar"
            value={newBlog.author.avatar}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                author: { ...newBlog.author, avatar: e.target.value },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          {/* <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          /> */}
          <Form.Control
            size="lg"
            placeholder="avatar"
            value={newBlog.content}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                content: e.target.value,
              });
            }}
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
