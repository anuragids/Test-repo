"use client"
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import axiosInstance from "@/lib/axios.instance";

export default function Home() {
  const { user } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
      const name = user.firstName + " " + user.lastName;
      const email = user.emailAddresses[0].emailAddress;
      const newUser = {
        name: name,
        email: email,
      };
      createUser(newUser).then(() => {
        // Redirect to dashboard
        router.push("/dashboard");
      });
    }
  }, [user]);

  const createUser = async (newUser: any) => {
    const userExists = await axiosInstance.get(`/users/${newUser.email}`);

    console.log("User exists:", userExists.data);
    if (!userExists.data) {
      const response = await axiosInstance.post("/users", newUser);
      console.log("User saved to database:", response.data);
    }
  };

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
