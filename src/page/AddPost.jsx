import { Container } from "../components/index"  // having problem in location
import  PostForm  from "../components/PostForm/PostForm"



function AddPost() {
  return (
    <div>
        <Container>
            <PostForm></PostForm>
        </Container>
    </div>
  )
}

export default AddPost