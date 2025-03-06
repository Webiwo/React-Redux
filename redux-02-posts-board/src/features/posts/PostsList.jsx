import { useSelector } from "react-redux";
import { allPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import PostTimePeriod from "./postTimePeriod";
import ReactionButtons from "./ReactionButtons";

//rafce
const PostsList = () => {
  const posts = useSelector(allPosts);

  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <PostTimePeriod timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
