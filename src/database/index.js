import mongoose from "mongoose";

mongoose
    .connect(
        "mongodb+srv://admin:senha@cluster0.bohor.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("It's working"))
    .catch(() => console.log("It's not working"));

mongoose.Promise = global.Promise;

export default mongoose;
