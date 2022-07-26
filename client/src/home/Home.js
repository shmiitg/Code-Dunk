import React from "react";
import ProblemsMain from "./components/ProblemsMain";
import FeaturedLists from "./components/FeaturedLists";
import QuickLinks from "./components/QuickLinks";
import FeaturedArticles from "./components/FeaturedArticles";
import "./Home.css";

const Problems = () => {
    return (
        <div className="home__container">
            <div className="home__small__container">
                <div className="main">
                    <ProblemsMain />
                </div>
                <div className="sidebar">
                    <FeaturedLists />
                    <FeaturedArticles />
                    <QuickLinks />
                </div>
            </div>
        </div>
    );
};

export default Problems;
