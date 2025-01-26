const BASE_URL = "https://localhost:3000/do-an";

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
