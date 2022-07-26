import { UserContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Error from "./error/Error";
// Problems
import ProblemCards from "./problems/pages/ProblemCards";
import ProblemList from "./problems/pages/ProblemList";
import ProblemCompany from "./problems/pages/ProblemCompany";
import ProblemSolve from "./problems/pages/ProblemSolve";
import ProblemMostLiked from "./problems/pages/ProblemMostLiked";
// Companies
import Companies from "./companies/Companies";
// Interview
import Interview from "./interview/Interview";
import InterviewForm from "./interview/InterviewForm";
import ReadInterview from "./interview/ReadInterview";
import InterviewEdit from "./interview/InterviewEdit";
// Auth
import Login from "./authentication/Login";
import Register from "./authentication/Register";
// Blog
import Blog from "./blog/Blog";
import BlogForm from "./blog/BlogForm";
import ReadBlog from "./blog/ReadBlog";
import BlogEdit from "./blog/BlogEdit";
// Dashboard
import DashBoard from "./user/dashboard/DashBoard";
import EditProfile from "./user/editprofile/EditProfile";
// Loading
import LoadingMain from "./loading/LoadingMain";

function App() {
    const { userName, setUserName } = useContext(UserContext);
    const { setUserId } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        const res = await fetch("/user/info");
        const data = await res.json();
        if (res.status === 200) {
            setUserName(data.user.username);
            setUserId(data.user._id);
        } else {
            setUserName(null);
            setUserId(null);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [userName]);

    if (loading) return <LoadingMain />;
    return (
        <div className="App">
            <Router>
                <Navbar userName={userName} />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    {/* Problems */}
                    <Route path="/problems" element={<ProblemCards />}></Route>
                    <Route path="/problems/:slug" element={<ProblemList />}></Route>
                    <Route path="/problems/company/:slug" element={<ProblemCompany />}></Route>
                    <Route path="/problem/:slug" element={<ProblemSolve />}></Route>
                    <Route path="/problems/most-liked" element={<ProblemMostLiked />}></Route>
                    {/* Interviews */}
                    <Route path="/interviews" element={<Interview />}></Route>
                    <Route path="/interview/new" element={<InterviewForm />}></Route>
                    <Route path="/interview/read/:id" element={<ReadInterview />}></Route>
                    <Route path="/interview/edit/:id" element={<InterviewEdit />}></Route>
                    {/* Authentication */}
                    <Route path="/login" element={userName ? <Navigate to="/" /> : <Login />} />
                    <Route
                        path="/register"
                        element={userName ? <Navigate to="/" /> : <Register />}
                    />
                    {/* Dashboard */}
                    <Route path="/profile/dashboard" element={<DashBoard />}></Route>
                    <Route
                        path="/profile/edit"
                        element={userName ? <EditProfile /> : <Navigate to="/" />}
                    ></Route>
                    {/* Blogs */}
                    <Route path="/blogs" element={<Blog />}></Route>
                    <Route path="/blog/new" element={<BlogForm />}></Route>
                    <Route path="/blog/read/:id" element={<ReadBlog />}></Route>
                    <Route path="/blog/edit/:id" element={<BlogEdit />}></Route>
                    {/* Companies */}
                    <Route path="/companies" element={<Companies />}></Route>
                    {/* Error */}
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
