import expres from 'express';
import dotenv from "dotenv";
import color from 'colors'
import cors from 'cors';
import morgan from 'morgan';
import route from './routes/testRoute.js';
import { connectDB } from './database/db.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoute.js';
import restaurantRouter from './routes/restaurantRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoutes.js';

// rest object
const app = expres();
dotenv.config();


// database
connectDB();


// middlewares
app.use(cors());
app.use(expres.json())
app.use(morgan('dev'));




// routes
app.use('/api/v1/test', route);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/order', orderRouter);




// route
// app.get('/', (req,res)=>{
//     res.send("Hello World");
// });

// console.log(process.env.PORT);
app.listen(process.env.PORT || 3000 , ()=> {
    console.log(`server is running at port ${process.env.PORT}...`.white.bgMagenta);
});
