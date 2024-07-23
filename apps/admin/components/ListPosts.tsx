import { PrismaClient } from '@repo/db'

const prisma = new PrismaClient()

const PostList = async () => {
  const posts = await prisma.post.findMany()

  return (
    <div>
      <ul>
        {posts?.map((post: { id: number; title: string; username: string }) => (
          <li key={post.id}>
            {post.title} by {post.username}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
