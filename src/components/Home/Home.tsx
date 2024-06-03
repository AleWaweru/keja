

type User = {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined;

type Props = {
    user: User,
    pagetype: string,
};

export default function UserCard({ user, pagetype }: Props) {
 

    return (
        <section className="flex flex-col gap-4">
            
            <p className="text-2xl text-center">Welcome Page!</p>
        </section>
    );
}
