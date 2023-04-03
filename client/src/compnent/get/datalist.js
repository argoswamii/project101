import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./datalist.css";
import Navigation from "../Navbar/navigation";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog/posts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navigation />
      <div className="post-list-container">
        {posts.map((post) => (
          <div
            className="post-card"
            key={post._id}
            onClick={() => navigate(`/blogs/${post._id}`, { state: { post } })}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p className="tag">Tags : {post.tags}</p>
            <p className="author">Author : {post.author}</p>
            <span className="date">Date : {post.createdAt}</span>
            <div>
              <p>Comment : {post.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;