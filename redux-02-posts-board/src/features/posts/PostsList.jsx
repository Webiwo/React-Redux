import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allPosts, postsStatus, postsError, fetchPosts } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

//rafce
const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(allPosts);
  const status = useSelector(postsStatus);
  const error = useSelector(postsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "succeeded") {
    const orderedPosts = [...posts].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
