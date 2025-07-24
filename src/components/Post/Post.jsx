'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

function Post() {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/posts');
            const { data } = response;
            setPosts(data.posts);
        } catch (error) {
            if(error) {
            return alert("Cannot get posts");
            }
        }
    } 

    useEffect(() => {
      if(posts.length === 0) {
        getPosts();
      }
    })

    return (
      <div className="post">
          {
            posts && 
            posts.map((post) => {
              const { id, title, body, reactions } = post;
              const { likes } = reactions;
              return (
                <div key={id}>
                  <p>ID: {id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                  <p>Likes: {likes}</p>
                </div>
              )
            })
          }
          {
            !posts && <div>No posts available...</div>
          }
      </div>
    );
  }
  
  export default Post;
  