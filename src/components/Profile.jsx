import React from "react";
import { EditButton, DeleteButton } from "./Delete&edit";
import { DeletePost } from "../api/Delete";

import "./styles/profile.css";

////////// this is the profile page where all your posts show up active and inactive   \\\\\\\\\\
export const Profile = ({ user }) => {
  const token = localStorage.getItem("token");

  console.log(user);

  const List = user.posts?.map((post) => {
    return (
      <div className="postProfile" key={post._id}>
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
              DeletePost(token, post._id);
            }}
          >
            <DeleteButton post={post} />
          </form>
        </div>
      </div>
    );
  });

  return (
  <div className="allProfilePosts">{List}</div>
  )
};
