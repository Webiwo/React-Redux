import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";

const reactionEmoji = {
  like: "\u{1F44D}",
  love: "\u{1F9E1}",
  crazy: "\u{1F92A}",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
