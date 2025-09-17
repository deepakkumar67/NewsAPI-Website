import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let [search, setSearch] = useState("")
    let [q, setQ] = useState("All")
    let [language, setLanguage] = useState("hi")

    let navigate = useNavigate()

    let searchParams = useLocation().search
    let query = new URLSearchParams(searchParams)

    function postSearch(e) {
        e.preventDefault()
        navigate(`/?q=${search}&language=${language}`)
        setSearch("")
    }

    useEffect(() => {
        setQ(query.get("q") ?? "All")
        setLanguage(query.get("language") ?? "hi")
    }, [searchParams])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary background sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to={`/language=${language}`}>NewsApp</Link>
                    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=All&language=${language}`}>All</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Politics&language=${language}`}>Politics</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Crime&language=${language}`}>Crime</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Science&language=${language}`}>Science</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Technology&language=${language}`}>Technology</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Entertainment&language=${language}`}>Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to={`/?q=Sports&language=${language}`}>Sports</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Other
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`/?q=Cricket&language=${language}`}>Cricket</Link></li>
                                    <li><Link className="dropdown-item" to={`/?q=IPL&language=${language}`}>IPL</Link></li>
                                    <li><Link className="dropdown-item" to={`/?q=Economics&language=${language}`}>Economics</Link></li>
                                    <li><Link className="dropdown-item" to={`/?q=International&language=${language}`}>International</Link></li>
                                    <li><Link className="dropdown-item" to={`/?q=India&language=${language}`}>India</Link></li>
                                    <li><Link className="dropdown-item" to={`/?q=Jokes&language=${language}`}>Jokes</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Language
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={`?q=${q}&language=hi`}>Hindi</Link></li>
                                    <li><Link className="dropdown-item" to={`?q=${q}&language=en`}>English</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e) => postSearch(e)}>
                            <input className="form-control me-2" name='search' value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}