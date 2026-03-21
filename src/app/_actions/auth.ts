"use server";
import axios from "axios";
import type { UserType } from "@/app/_types/types";
import { setUserSession } from "@/app/_lib/session";

const API_URL= "http://localhost:3001";

export const loginAction = async({
    email,
    password
}: {
    email: string;
    password: string;
}) => {
    let userResponse: {userid: string, name: string, email: string};
    try {
     const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
     const user: UserType | undefined = response.data?.[0];
     if(!user){
        return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 400 });
     }
     userResponse = {userid: user.userid, name: user.name, email: user.email}
     await setUserSession(userResponse);
    } catch (error) {    
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true, user: userResponse }), { status: 200 });
};