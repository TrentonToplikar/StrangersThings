import React from "react";
import { EditButton, DeleteButton } from "./Delete&edit";
import { DeletePost } from "../api/Delete";
import { MessageForm } from "./MessageForm";
import "./styles/SinglePost.css";

////////// this is the view you see when you select view post  \\\\\\\\\\
export const SinglePost = ({ selectedPost, setSelectedPost }) => {
  return (
    <div className="singlePost" key={selectedPost._id}>
      <h2>Title: {selectedPost.title}</h2>
      <h3>Poster: {selectedPost.author.username}</h3>
      <div>
        <p>Description: {selectedPost.description}</p>
        <p>Location:{selectedPost.location}</p>
        <p>Will Deliver: (WORK IN PROGRESS){selectedPost.willDeliver}</p>
        <p>Price: {selectedPost.price}</p>

        {selectedPost.messages.map((message) => {
          return <p key={message._id}>message: {message.content}</p>;
        })}
        <form
          onClick={() => {
            localStorage.setItem("PostToBeEdited", selectedPost._id);
          }}
        >
          <a href="/EditPost">
            <EditButton post={selectedPost} />
          </a>
        </form>
        <form
          onSubmit={() => {
            DeletePost(localStorage.getItem("token"), selectedPost._id);
          }}
        >
          <DeleteButton post={selectedPost} />
        </form>
        <MessageForm selectedPost={selectedPost} />
        <button onClick={() => { setSelectedPost([]) }} > Go back </button>
      </div>
    </div>
  );
};
