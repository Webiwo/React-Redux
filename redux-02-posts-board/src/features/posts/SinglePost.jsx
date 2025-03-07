import { useSelector } from "react-redux";
import { postById } from "./postSlice";
import { useParams, Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import PostTimePeriod from "./postTimePeriod";
import ReactionButtons from "./ReactionButtons";

const SinglePost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => postById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTimePeriod timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePost;
