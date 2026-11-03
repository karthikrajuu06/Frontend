import React from "react";

function Card(props) {
    const doctor = props.details;

    return (
        <div className="doctor-card">

            <div className="doctor-info">

                <div className="doctor-avatar">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="60" fill="#ff5967" />

                        <path
                            d="M25 120c3-22 15-34 35-34s32 12 35 34"
                            fill="white"
                        />

                        <path d="M45 83h30l-4 37H49z" fill="#e9f5f6" />

                        <path
                            d="M47 34c0-14 7-22 15-22s16 8 16 22v16c0 15-8 25-18 25S43 65 43 50V37z"
                            fill="#f4c49a"
                        />

                        <path
                            d="M43 43c-4-17 2-31 17-32 13-1 22 8 20 25l-5-8c-7 3-17 3-27 1z"
                            fill="#55534d"
                        />

                        <path d="M53 84h14l-3 13-4 8-4-8z" fill="#13a6a9" />

                        <path d="M43 86c-9 3-15 11-18 22l9 12h12l7-29z" fill="white" />

                        <path d="M77 86c9 3 15 11 18 22l-9 12H74l-7-29z" fill="white" />
                    </svg>
                </div>

                <div className="doctor-details">

                    <h2>Dr.{doctor.name}</h2>

                    <p className="specialization">
                        {doctor.specialization} Specialist
                    </p>

                    <p className="gender">
                        {doctor.gender}
                    </p>

                </div>

            </div>

            <button
                className="view-button"
                onClick={props.onView}
            >
                View Details
            </button>

        </div>
    );
}

export default Card;