"use client";

import React, { useEffect } from "react";
import "./logout.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserStatus } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

const Logout = () => {
  const status = useSelector(selectUserStatus);
  const router = useRouter();

  const dispatch = useDispatch();
  const handleLogout = (e: any) => {
    e.preventDefault();

    dispatch(logout());
  };

  const users = useSelector((state: any) => state.user.users);
  const loginUser = useSelector((state: any) => state.user.loggedInUser);

  useEffect(() => {
    if (status === "loggedOut") {
      router.push("/login");
    }
  }, [status, users]);

  return (
    <div className="container">
      {loginUser ? (
        <>
          <h1>
            Selamat datang Sir{" "}
            <span className="user_name">{loginUser.name}</span>{" "}
          </h1>
          <button className="logout_button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>No registered users yet.</p>
      )}
    </div>
  );
};

export default Logout;
