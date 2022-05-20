import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Error from "./error/Error";
// Problems
import ProblemCards from "./problems/pages/ProblemCards";
import ProblemList from "./problems/pages/ProblemList";
import ProblemCompany from "./problems/pages/ProblemCompany";
import ProblemSolve from "./problems/pages/ProblemSolve";
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

const DefaultRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                {/* Problems */}
                <Route path="/problems" element={<ProblemCards />}></Route>
                <Route path="/problems/:topic" element={<ProblemList />}></Route>
                <Route path="/problems/company/:company" element={<ProblemCompany />}></Route>
                <Route path="/problem/:problem" element={<ProblemSolve />}></Route>
                {/* Interviews */}
                <Route path="/interviews" element={<Interview />}></Route>
                <Route path="/interview/new" element={<InterviewForm />}></Route>
                <Route path="/interview/read/:id" element={<ReadInterview />}></Route>
                <Route path="/interview/edit" element={<InterviewEdit />}></Route>
                {/* Authentication */}
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/* Dashboard */}
                <Route path="/profile/dashboard" element={<DashBoard />}></Route>
                <Route path="/profile/edit" element={<EditProfile />}></Route>
                {/* Blogs */}
                <Route path="/blogs" element={<Blog />}></Route>
                <Route path="/blog/new" element={<BlogForm />}></Route>
                <Route path="/blog/read/:id" element={<ReadBlog />}></Route>
                <Route path="/blog/edit" element={<BlogEdit />}></Route>
                {/* Companies */}
                <Route path="/companies" element={<Companies />}></Route>
                {/* Error */}
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <Router>
            <UserContextProvider>
                <DefaultRoutes />
            </UserContextProvider>
        </Router>
    );
}

export default App;
