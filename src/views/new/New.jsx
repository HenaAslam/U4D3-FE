// import { convertToHTML } from "draft-convert";
// import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const NewBlogPost = (props) => {
  const [fileForCover, setFileForCover] = useState([]);

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
  const uploadCover = (e) => {
    setFileForCover([...fileForCover, e.target.files[0]]);
  };

  const sendNewBlog = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/blogs/`, {
        method: "POST",
        body: JSON.stringify(newBlog),

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = response.json();

        return data;
      } else {
        alert("problem posting blog");
        console.log(response);
      }
    } catch (error) {
      console.log();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let createdBlog = await sendNewBlog();
    console.log("blog", createdBlog);

    console.log("file", fileForCover);
    if (fileForCover) {
      console.log("idddddddddddddd", createdBlog._id);
      newCoverUpload(fileForCover[0], createdBlog._id);
    }
  };
  const newCoverUpload = async (file, id) => {
    try {
      console.log(file, id);
      const formData = new FormData();
      formData.append("cover", file);

      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs/${id}/uploadCover`,

        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("You made it!");
        alert("blog added");
      } else {
        console.log("Try harder!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
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
        {/* <Form.Group controlId="blog-form" className="mt-3">
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
        </Form.Group> */}
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
            placeholder="content"
            value={newBlog.content}
            onChange={(e) => {
              setNewBlog({
                ...newBlog,
                content: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Choose blog cover</Form.Label>
          <Form.Control type="file" onChange={uploadCover} />
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
