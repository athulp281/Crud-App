import React, { useState } from "react";
import "../../assets/login.css";

export default function LoginAndReg() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    console.log(data);
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
                        <input type="submit" value="Sign in" />
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
