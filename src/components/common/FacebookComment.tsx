const BASE_URL = "https://localhost:3000/do-an";
// const BASE_URL = new URL(
//     "do-an/",
//     process.env.NEXT_PUBLIC_FRONTEND_URL
// ).toString();
function FacebookComment({ id }: { id: string }) {
    const commentUrl = `${BASE_URL}/${id}`;

    return (
        <div
            className="fb-comments"
            data-href={commentUrl}
            data-width=""
            data-numposts="5"
        ></div>
    );
}

export default FacebookComment;
