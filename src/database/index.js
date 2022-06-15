import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost/comp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("It's working"))
    .catch(() => console.log("It's not working"));

mongoose.Promise = global.Promise;

export default mongoose;
