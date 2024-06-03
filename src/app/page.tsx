import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/option"
import UserCard from "@/components/Home/Home"


export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        <h1 className="text-5xl">You must be logged in</h1>
      )}
    </>
  )
}