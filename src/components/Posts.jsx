import React, { useState, useEffect } from "react";
import { FetchPosts } from "../api/postsAPI";
import { DeleteButton, EditButton } from "./Delete&edit";
import { DeletePost } from "../api/Delete";
import { SinglePost } from "./SinglePost";

import "./styles/Posts.css";

////////// this is the big boy of the project. it renders all the posts and determines if you are searching or not and a lot of other things \\\\\\\\\\
export const PostList = ({ token, selectedPost, setSelectedPost }) => {
  const [postList, setPostList] = useState([]);
  const [search, setSearch] = useState("");
  const [newPosts, setNewPosts] = useState([]);
  const [renderPosts, setRenderposts] = useState([]);
  const [searching, setSearching] = useState("");

  //search bar parts \\
  const searchEngine = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setRenderposts(postList);

    if (search.length > 0) {
      setSearching(true);
      const filteredPosts = postList.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      });
      setNewPosts(filteredPosts);
      console.log(newPosts);
      setRenderposts(newPosts);
    } else {
      setRenderposts(postList);
      setSearching(false);
    }
  };

  // ending
  useEffect(() => {
    const GetPosts = async () => {
      const data = await FetchPosts();
      setPostList(data);
      console.log(postList);
    };
    GetPosts();
  }, []);

  ////////// this renders the new searching list \\\\\\\\\\
  const NewList = renderPosts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <h2>Title: {post.title}</h2>
        <h3>Poster: {post.author.username}</h3>
        <div>
          <p>Description: {post.description}</p>
          <p>Location:{post.location}</p>
          <p>Will Deliver: (WORK IN PROGRESS){post.willDeliver}</p>
          <p>Price: {post.price}</p>
          <form
            onClick={() => {
              localStorage.setItem("PostToBeEdited", post._id);
            }}
          >
            <a href="/EditPost">
              <EditButton post={post} />
            </a>
          </form>
          <form
            onSubmit={() => {
              DeletePost(localStorage.getItem("token"), post._id);
            }}
          >
            <DeleteButton post={post} />
          </form>
          <button className="viewpost" onClick={() => setSelectedPost(post)}>
            View Post
          </button>
        </div>
      </div>
    );
  });
  //////////  \\\\\\\\\\

  ////////// this renders all the posts if you are not searching. i know very inefficient  \\\\\\\\\\
  const List = postList.map((post) => {
    return (
      <div className="post" key={post._id}>
        <div>
          <h2> {post.title}</h2>
          <h3>User: {post.author.username}</h3>
          <p> {post.description}</p>
          <p>Location:{post.location}</p>
          <p>
            Will Deliver: (work in progress){post.willDeliver ? true : false}{" "}
          </p>
          <p>Price: {post.price}</p>
          <form
            onClick={() => {
              localStorage.setItem("PostToBeEdited", post._id);
            }}
          >
            <a href="/EditPost">
              <EditButton post={post} />
            </a>
          </form>
          <form
            onSubmit={() => {
              DeletePost({ token }, post._id);
            }}
          >
            <DeleteButton post={post} />
          </form>
        </div>
        <button className="viewpost" onClick={() => setSelectedPost(post)}>
          View Post
        </button>
      </div>
    );
  });

  return (
    <div>
      {selectedPost._id ? (
        <SinglePost
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      ) : (
        <div className="search-bar-page-container">
          <form
          className="search-bar-container"
            onSubmit={(e) => {
              e.preventDefault();
              setSearching(false);
              setSearch("");
            }}
          >
            <input
            className="search-bar"
              value={search}
              onChange={searchEngine}
              type="text"
              placeholder="Search Title Here"
            ></input>
            <button className="search-bar-button" id="clear" type="submit">
              <img className="clear-image" src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_not_interested_48px-512.png" alt="clear" />
            </button>
          </form>
          <div className="allposts">{searching ? NewList : List}</div>
        </div>
      )}
    </div>
  );
};
