import React, { useEffect, useState } from "react";
import "../../assets/login.css";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function LoginAndReg() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = () => {
        axios
            .post("http://localhost:8081/auth/signin", data)
            .then((res) => {
                console.log(res);
                const userInfo = res.data;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                setData({
                    username: "",
                    password: "",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const userInfoString = localStorage.getItem("userInfo");
    console.log("userInfoString", userInfoString);
    useEffect(() => {
        if (userInfoString) {
            navigate("/students", { replace: true });
        }
    }, [userInfoString]);

    return (
        <div className="conatiner">
            <div className="ring">
                <i style={{ "--clr": "#00ff0a" }}></i>
                <i style={{ "--clr": "#ff0057" }}></i>
                <i style={{ "--clr": "#fffd44" }}></i>
                <div className="login">
                    <h2>Login</h2>
                    <div className="inputBx">
                        <input
                            type="text"
                            placeholder="Username"
                            value={data.username}
                            onChange={(e) => {
                                setData({ ...data, username: e.target.value });
                            }}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            value={data.password}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                        />
                    </div>
                    <div className="inputBx">
                        <input
                            type="submit"
                            onClick={handleSubmit}
                            value="Sign in"
                        />
                    </div>
                    <div className="links">
                        <a href="#">Forget Password</a>
                        <a href="#">Signup</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
