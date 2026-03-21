import axios from "axios";
import type { UserType } from "@/app/_types/types";
import { redirect } from "next/navigation";
import { setUserSession } from "@/app/_lib/session";

const API_URL= "http://localhost:3001";

export const loginAction = async({
    email,
    password
}: {
    email: string;
    password: string;
}) => {
    try {
     const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
     const user: UserType | undefined = response.data[0];
     if(!user) throw new Error("Invalid email or password");
     await setUserSession(user);
     redirect("/contact");
    } catch (error) {
        console.error("Login error:", error);
    }
};