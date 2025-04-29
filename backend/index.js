import app from "./app.js";
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.route.js'
import eventRouter from './routes/event.route.js'
import jobRouter from './routes/job.route.js'
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/jobs', jobRouter)