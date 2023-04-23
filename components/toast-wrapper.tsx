"use client";
import { Toaster } from "react-hot-toast";

export default function ToastWrapper({ children }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}
