import PostsList from "./features/postsSlice/PostsList";
import PostForm from "./features/postsSlice/PostForm";

function App() {
  return (
    <main className="App">
      <PostForm />
      <PostsList />
    </main>
  );
}

export default App;
