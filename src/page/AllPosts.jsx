import { PostCard } from "../components";
import { Container } from "../components";
import { useEffect } from "react";
import { appwriteService } from "../appwrite/config";

function AllPosts() {
    const [Posts, setPost] = useState([]);

    useEffect(() => {}, []);
    appwriteService.getPost([]).then((Posts) => {
        if (Posts) {
            setPost(Posts.documents);
        }
    });

    return (
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap">
                    {Posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
