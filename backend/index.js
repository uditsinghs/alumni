import app from "./app.js";
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.route.js'
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)