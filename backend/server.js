import express from "express"
import dotenv from "dotenv"

import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });



const app = express()

const PORT = process.env.PORT || 3000


// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))



// apis
 app.use("/api/v1/user", userRoute)
 app.use("/api/v1/blog", blogRoute)
 app.use("/api/v1/comment", commentRoute)

 app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    connectDB()
})

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import blogRoute from "./routes/blog.route.js";
// import commentRoute from "./routes/comment.route.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// dotenv.config();
// console.log("MONGO_URI =", process.env.MONGO_URI);

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "https://mern-blog-ha28.onrender.com",
//     credentials: true,
//   })
// );

// // Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/blog", blogRoute);
// app.use("/api/v1/comment", commentRoute);

// // Serve frontend
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "frontend", "dist")));

// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// // Start server AFTER DB connection
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server listening at port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//   }
// };

// startServer();
