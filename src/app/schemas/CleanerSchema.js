import mongoose from "../../database/index.js";

const CleanerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    availability: [
        {
            type: String,
            required: true,
        },
    ],
    serviceValor: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
});

export default mongoose.model("cleaner", CleanerSchema);
