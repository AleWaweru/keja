import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
                label: "Username: ",
                type: "text",
                placeholder: "add username..."
            },
            password: {
                label: "Password: ",
                type: "password",
                placeholder: "add password..."
            },
          },
          async authorize(credentials){
            // This is where you need to retrieve user data
            // to verify with credential
            //Docs:https://next-auth.js.org/cofiguration/providers/credentials
            const user = {id: "42", name: "alex", password: "test123"}

            if(credentials?.username === user.name && credentials?.password === user.password ){
                return user
            }else{
                return null
            }
          }
        })
    ],
}