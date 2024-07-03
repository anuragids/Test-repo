import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-black ">
      <Image src="/logo-1.png" alt="logo" width={80} height={80} />
      {children}
    </div>
  );
};

export default AuthLayout;
