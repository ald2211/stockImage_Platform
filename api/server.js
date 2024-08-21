import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import imageRouter from './routes/image.route.js'
import connectDB from './config/dbConnection.js'


dotenv.config()
const app=express()

connectDB();

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/image',imageRouter);




// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const port=process.env.PORT||5000
app.listen(port, (err) => {
    if (err) {
      console.error("Failed to start server:", err);
    } else {
      console.log(`Server is running on port ${port}`);
    }
  });