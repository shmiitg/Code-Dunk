import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/icon-company.svg";
import styles from "./Companies.module.css";
import Loading from "../loading/Loading";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const res = await fetch("/api/companies");
        const data = await res.json();
        if (res.status === 200) {
            setCompanies(data.companies);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;
    return (
        <div className="container">
            <div className={styles["company-container"]}>
                {companies.map((company, index) => (
                    <Link
                        key={index}
                        className={styles["company-card"]}
                        to={`/problems/company/${company.unique_link}`}
                    >
                        <div className={styles["company-name"]}>{company.name}</div>
                        <div className={styles["company-problems"]}>{company.problems?.length}</div>
                        <div className={styles["company-logo"]}>
                            <img src={logo} alt="icon" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Companies;
