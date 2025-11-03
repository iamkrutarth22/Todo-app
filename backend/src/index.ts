import express from 'express';
import cors from 'cors';
import userRoute from './routes/user.routes.js'
import authRoute from './routes/auth.routes.js'
import taskRoute from './routes/task.routes.js'
import { authenticateUser } from './middlewares/authMiddleware.js';

const app = express();

const port = 8080;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use('/api',userRoute)
app.use('/api',authRoute)
app.use('/api',authenticateUser,taskRoute)


app.listen(port, () => {
  console.log(`[server]: Server running at http://localhost:${port}`);
});

