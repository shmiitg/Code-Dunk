import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { withRouter } from 'react-router';
import UserContextProvider from './context/UserContext';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Error from './error/Error';
// Problems
import Problems from './problems/Problems';
import ProblemsList from './problems/problemlist/ProblemsList';
import Problem from './problems/problem/Problem';
import CompanyProblems from './problems/company/CompanyProblems';
// Contest
import Contests from './contest/Contests';
import Contest from './contest/Contest';
// Interview
import Interview from './interview/Interview';
import InterviewForm from './interview/InterviewForm';
import ReadInterview from './interview/ReadInterview';
import InterviewEdit from './interview/InterviewEdit'
// Auth
import Login from './authentication/Login';
import Register from './authentication/Register';
// Blog
import Blog from './blog/Blog';
import BlogForm from './blog/BlogForm';
import ReadBlog from './blog/ReadBlog';
import BlogEdit from './blog/BlogEdit'
// Dashboard
import DashBoard from './user/dashboard/DashBoard';
import EditProfile from './user/editprofile/EditProfile';

const DefaultRoutes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* Problems */}
        <Route exact path="/problems" component={Problems}></Route>
        <Route exact path="/problems/:topic" component={ProblemsList}></Route>
        <Route path="/problem" component={Problem}></Route>
        <Route path="/problems/company" component={CompanyProblems}></Route>
        {/* Contests */}
        <Route exact path="/contests" component={Contests}></Route>
        <Route path="/contest" component={Contest}></Route>
        {/* Interviews */}
        <Route exact path="/interviews" component={Interview}></Route>
        <Route exact path="/interview/new" component={InterviewForm}></Route>
        <Route exact path="/interview/read/:id" component={ReadInterview}></Route>
        <Route path="/interview/edit" component={InterviewEdit}></Route>
        {/* Authentication */}
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        {/* Dashboard */}
        <Route exact path="/profile/dashboard" component={DashBoard}></Route>
        <Route exact path="/profile/edit" component={EditProfile}></Route>
        {/* Blogs */}
        <Route exact path="/blogs" component={Blog}></Route>
        <Route exact path="/blog/new" component={BlogForm}></Route>
        <Route exact path="/blog/read/:id" component={ReadBlog}></Route>
        <Route path="/blog/edit" component={BlogEdit}></Route>

        <Route component={Error}></Route>
      </Switch>
    </>
  )
}

function App() {

  return (
    <Router>
      <UserContextProvider>
        <DefaultRoutes />
      </UserContextProvider>
    </Router >

  );
}


// For No Navbar

// const App = withRouter(({location}) => {

//   return (
//     <UserContextProvider>
//       {location.pathname !== '/profile/edit' && <Navbar />}
//       <Switch>
//         <Route exact path="/" component={Home}></Route>
//         {/* Problems */}
//         <Route exact path="/problems" component={Problems}></Route>
//         {/* Contests */}
//         <Route exact path="/contests" component={Contest}></Route>
//         {/* Interviews */}
//         <Route exact path="/interviews" component={Interview}></Route>
//         <Route exact path="/interview/new" component={InterviewForm}></Route>
//         <Route exact path="/interview/read/:id" component={ReadInterview}></Route>
//         {/* Authentication */}
//         <Route exact path="/login" component={Login}></Route>
//         <Route exact path="/register" component={Register}></Route>
//         {/* Dashboard */}
//         <Route exact path="/profile/dashboard" component={Dashboard}></Route>
//         <Route exact path="/profile/edit" component={EditProfile}></Route>
//         {/* Blogs */}
//         <Route exact path="/blogs" component={Blog}></Route>
//         <Route exact path="/blog/new" component={BlogForm}></Route>
//         <Route exact path="/blog/read/:id" component={ReadBlog}></Route>
//       </Switch>
//     </UserContextProvider>
//   );
// })

export default App;
