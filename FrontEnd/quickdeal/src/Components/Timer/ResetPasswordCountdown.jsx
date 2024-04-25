import React, { useState, useEffect } from "react";

const ResetPassTimer = ({ targetDate, onTimeUp }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        if (timerEnded) {
            return; // Timer has ended, no need to update
        }

        const timer = setTimeout(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (Object.values(newTimeLeft).every((val) => val === 0)) {
                setTimerEnded(true);
                onTimeUp(); // Call callback function to trigger reload
            }
        }, 1000);

        // Clear timeout if the component is unmounted or timer has ended
        return () => clearTimeout(timer);
    });

    return (
        <div>
            <span
                style={{
                    color: "#4a4360",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "18px",
                }}>
                {timerEnded ? (
                    <div style={{ color: "red" }}>OTP has been expired ! </div>
                ) : (
                    <div style={{ display: "flex" }}>
                        OTP will expire in :&emsp;
                        <div>
                            {timeLeft.minutes?.toString().length === 1
                                ? `0${timeLeft.minutes}`
                                : timeLeft.minutes}{" "}
                            :{" "}
                            {timeLeft.seconds?.toString().length === 1
                                ? `0${timeLeft.seconds}`
                                : timeLeft.seconds}{" "}
                        </div>
                    </div>
                )}
            </span>
        </div>
    );
};

export default ResetPassTimer;
