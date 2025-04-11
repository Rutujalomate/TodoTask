const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
const ItemRoutes=require("./routes/itemRoutes")
const UserRoutes=require("./routes/userRoutes")
const uri = "mongodb+srv://r:lo@todolist.chn7moj.mongodb.net/?appName=ToDoList";
const url=`mongodb+srv://r:<db_password>@todolist.chn7moj.mongodb.net/`


mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/task",ItemRoutes)
app.use("/api/user",UserRoutes)

app.listen(8080,()=>console.log("app running on port 8080"))
