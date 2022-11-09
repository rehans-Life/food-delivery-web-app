import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/UserSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AppLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      authUser ? dispatch(setUser(authUser)) : dispatch(removeUser());
    });
  }, []);
  return (
    <div className="w-screen h-100% flex flex-col justify-center relative bg-primary scrollbar-hide">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
}
