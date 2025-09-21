import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            search: ""
        };
    }

    postSearch(e) {
        e.preventDefault();
        this.props.changeSearch(this.state.search);
        this.setState({ search: "" });
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary background sticky-top">
                    <div className="container-fluid">
                        <NavLink
                            className="navbar-brand text-light"
                            to="/"
                            onClick={() => this.props.changeSearch("")}
                        >
                            NewsApp
                        </NavLink>
                        <button
                            className="navbar-toggler text-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {["All", "Politics", "Crime", "Science", "Technology", "Entertainment", "Sports"].map((cat) => (
                                    <li className="nav-item" key={cat}>
                                        <NavLink
                                            className="nav-link text-light"
                                            to={`/${cat}`}
                                            onClick={() => this.props.changeSearch("")}
                                        >
                                            {cat}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className="nav-item dropdown">
                                    <button
                                        className="nav-link text-light dropdown-toggle btn btn-link"
                                        id="otherDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Other
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="otherDropdown">
                                        {["Cricket", "IPL", "Economics", "International", "India", "Jokes"].map((item) => (
                                            <li key={item}>
                                                <NavLink
                                                    className="dropdown-item"
                                                    to={`/${item}`}
                                                    onClick={() => this.props.changeSearch("")}
                                                >
                                                    {item}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <button
                                        className="nav-link text-light dropdown-toggle btn btn-link"
                                        id="languageDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Language
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                                        <li>
                                            <button className="dropdown-item" onClick={() => this.props.changeLanguage("hi")}>
                                                Hindi
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={() => this.props.changeLanguage("en")}>
                                                English
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" role="search" onSubmit={(e) => this.postSearch(e)}>
                                <input
                                    className="form-control me-2"
                                    name="search"
                                    value={this.state.search}
                                    onChange={(e) => this.setState({ search: e.target.value })}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-light" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
