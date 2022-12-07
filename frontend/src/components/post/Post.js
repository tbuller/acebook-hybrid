import React from "react";

const renderRecentComment = (post) => {
  if (post.comments.length > 0)
    return (
      <article data-cy="post" key={post._id}>
        MOST RECENT COMMENT:
        {post.comments[post.comments.length - 1].user} ADDED A COMMENT:{" "}
        {post.comments[post.comments.length - 1].comment} ON:{" "}
        {new Date(post.comments[post.comments.length - 1].time)
          .toString()
          .slice(0, 28)}
      </article>
    );
  return null;
};

const Post = ({ post }) => {
  return (
    <div>
      <br></br>
      <article data-cy="post" key={post._id}>
        {post.message}
      </article>
      <article data-cy="post" key={post._id}>
        {new Date(post.time).toString().slice(0, 28)}
      </article>
      <article>{`${post.likes.length} likes!`}</article>
      {renderRecentComment(post)}
    </div>
  );
};

export default Post;
