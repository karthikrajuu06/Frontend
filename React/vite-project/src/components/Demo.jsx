import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Loading from "./Loading";

const API_URL = "https://doc-back-v2nv.onrender.com/doctors";

function Demo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("All");
    const [page, setPage] = useState("home");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        salary: "",
        gender: "Male",
        age: "",
        specialization: ""
    });

    async function getData() {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get(API_URL);
            setData(res.data);
        } catch (err) {
            console.log(err);
            setError("Unable to load doctors. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const specializations = [
        ...new Set(data.map(item => item.specialization).filter(Boolean))
    ];

    const filteredData = data.filter(item => {
        const matchesName = item.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesSpecialization =
            specialization === "All" ||
            item.specialization?.toLowerCase() === specialization.toLowerCase();

        return matchesName && matchesSpecialization;
    });

    async function addDoctor(e) {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post(API_URL, {
                ...form,
                age: Number(form.age)
            });

            alert("Doctor added successfully!");

            setForm({
                name: "",
                salary: "",
                gender: "Male",
                age: "",
                specialization: ""
            });

            await getData();
            setPage("home");

        } catch (err) {
            console.log(err);
            alert("Unable to add doctor. Check your backend API.");
        } finally {
            setLoading(false);
        }
    }

    function clearFilters() {
        setSearch("");
        setSpecialization("All");
    }

    let newArr = filteredData.map((item, ind) => (
        <Card
            details={item}
            key={item.id ?? ind}
            onView={() => {
                setSelectedDoctor(item);
                setPage("details");
            }}
        />
    ));

    return (
        <div className="app">

            <header className="navbar">

                <div className="brand">
                    <span className="brand-icon">+</span>
                    <span>Doctors App</span>
                </div>

                <div className="nav-buttons">
                    <button
                        className="nav-button"
                        onClick={() => {
                            setPage("home");
                            setSelectedDoctor(null);
                        }}
                    >
                        Home
                    </button>

                    <button
                        className="nav-button add-nav"
                        onClick={() => setPage("add")}
                    >
                        Add Doctor
                    </button>
                </div>

            </header>

            <main className="main-content">

                {page === "home" && (
                    <>
                        <div className="filter-bar">

                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                            <select
                                value={specialization}
                                onChange={e => setSpecialization(e.target.value)}
                            >
                                <option value="All">All Specializations</option>

                                {specializations.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="clear-button"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>

                        </div>

                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <div className="message">
                                <p>{error}</p>
                                <button onClick={getData}>Retry</button>
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="message">
                                <h3>No doctors found</h3>
                                <p>Try changing your search or filters.</p>
                            </div>
                        ) : (
                            <div className="doctor-grid">
                                {newArr}
                            </div>
                        )}
                    </>
                )}

                {page === "add" && (
                    <div className="form-container">

                        <h2>Add New Doctor</h2>

                        <form onSubmit={addDoctor}>

                            <label>Doctor Name</label>
                            <input
                                type="text"
                                placeholder="Enter doctor name"
                                value={form.name}
                                onChange={e =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                            />

                            <label>Salary</label>
                            <input
                                type="number"
                                placeholder="Enter salary"
                                value={form.salary}
                                onChange={e =>
                                    setForm({ ...form, salary: e.target.value })
                                }
                                required
                            />

                            <label>Age</label>
                            <input
                                type="number"
                                placeholder="Enter age"
                                value={form.age}
                                onChange={e =>
                                    setForm({ ...form, age: e.target.value })
                                }
                                required
                            />

                            <label>Gender</label>
                            <select
                                value={form.gender}
                                onChange={e =>
                                    setForm({ ...form, gender: e.target.value })
                                }
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>

                            <label>Specialization</label>
                            <input
                                type="text"
                                placeholder="Enter specialization"
                                value={form.specialization}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        specialization: e.target.value
                                    })
                                }
                                required
                            />

                            <div className="form-actions">
                                <button type="button"
                                    className="cancel-button"
                                    onClick={() => setPage("home")}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="clear-button"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Doctor"}
                                </button>
                            </div>

                        </form>
                    </div>
                )}

                {page === "details" && selectedDoctor && (
                    <div className="details-container">

                        <button
                            className="back-button"
                            onClick={() => setPage("home")}
                        >
                            ← Back to Home
                        </button>

                        <div className="details-card">
                            <div className="details-avatar">
                                <CardAvatar />
                            </div>

                            <div>
                                <h1>Dr. {selectedDoctor.name}</h1>

                                <p className="specialization">
                                    {selectedDoctor.specialization} Specialist
                                </p>

                                <p>Gender: {selectedDoctor.gender}</p>
                                <p>Age: {selectedDoctor.age}</p>
                                <p>Salary: ₹{selectedDoctor.salary}</p>
                                <p>ID: {selectedDoctor.id}</p>
                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
}

function CardAvatar() {
    return (
        <div className="avatar">
            <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="60" fill="#ff5967" />
                <path d="M25 120c3-22 15-34 35-34s32 12 35 34" fill="white" />
                <path d="M45 83h30l-4 37H49z" fill="#e9f5f6" />
                <path d="M47 34c0-14 7-22 15-22s16 8 16 22v16c0 15-8 25-18 25S43 65 43 50V37z" fill="#f4c49a" />
                <path d="M43 43c-4-17 2-31 17-32 13-1 22 8 20 25l-5-8c-7 3-17 3-27 1z" fill="#55534d" />
                <path d="M53 84h14l-3 13-4 8-4-8z" fill="#13a6a9" />
                <path d="M43 86c-9 3-15 11-18 22l9 12h12l7-29z" fill="white" />
                <path d="M77 86c9 3 15 11 18 22l-9 12H74l-7-29z" fill="white" />
            </svg>
        </div>
    );
}

export default Demo;