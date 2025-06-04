/* eslint-disable react-hooks/exhaustive-deps */
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Events from "./Events";
// import AlumniCard from "./AlumniCard";
import StatsSection from "./StatsSection";
import AlumniStories from "./AlumniStories";
// import { useDispatch } from "react-redux";
import Post from "../Post";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getAllPosts } from "@/features/post/postService";
// import { getPost } from "@/features/post/postSlice";

const HomePage = () => {
  // const [posts, setPosts] = useState([]);
  // const dispatch = useDispatch();

  // const fetchPosts = async () => {
  //   const data = await getAllPosts();
  //   setPosts(data.posts);
  //   dispatch(getPost(data.posts));
  // };
  // useEffect(() => {
  //   fetchPosts();
  // }, [dispatch]);
  const { posts } = useSelector((state) => state.post);
  // console.log(posts.posts);
  

  const latestPosts = posts?.posts?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col ">
      <div>
        <HeroSection />
      </div>
      <div> 
        <AboutSection />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {latestPosts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            to="/posts"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            See More Posts
          </Link>
        </div>
      </div>
      <div> 
        <Events />
      </div>
      <div>
        <AlumniStories />
      </div>
      <div>
        <StatsSection />
      </div>
    </div>
  );
};

export default HomePage;
