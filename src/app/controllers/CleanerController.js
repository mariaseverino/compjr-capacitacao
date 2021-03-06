import mongo from "mongoose";
import Cleaner from "../schemas/CleanerSchema.js";

export default {
    create(request, response) {
        const { name, availability, serviceValor, contact } = request.body;

        Cleaner.findOne({ contact })
            .then((cleanerAlreadyExists) => {
                if (cleanerAlreadyExists) {
                    return response
                        .status(400)
                        .json({ error: "Cleaner already exists" });
                } else {
                    Cleaner.create({
                        name,
                        availability,
                        serviceValor,
                        contact,
                    })
                        .then(() => {
                            return response
                                .status(200)
                                .json({ message: "Successful operation" });
                        })
                        .catch((err) => {
                            console.log(err);
                            return response
                                .status(500)
                                .json({ error: "Registration Failed" });
                        });
                }
            })
            .catch((error) => {
                return response
                    .status(500)
                    .send({ error: "Registration Failed" });
            });
    },

    index(request, response) {
        Cleaner.find()
            .then((cleaners) => {
                return response.status(200).json({ cleaners });
            })
            .catch((err) => {
                console.log(err);
                return response
                    .status(500)
                    .json({ error: "Internal server error" });
            });
    },

    update(request, response) {
        const id = request.params.id;
        const { name, availability, serviceValor, contact } = request.body;

        if (!mongo.isValidObjectId(id)) {
            return response.status(400).json({ error: "This id is not valid" });
        }
        Cleaner.findByIdAndUpdate(id, {
            name,
            availability,
            serviceValor,
            contact,
        })
            .then((cleaner) => {
                if (!cleaner) {
                    return response
                        .status(404)
                        .json({ error: "Cleaner not found" });
                }
                return response
                    .status(200)
                    .json({ message: "Successful operation" });
            })
            .catch((err) => {
                return response
                    .status(500)
                    .json({ error: "Internal server error" });
            });
    },

    delete(request, response) {
        const id = request.params.id;

        if (!mongo.isValidObjectId(id)) {
            return response.status(400).json({ error: "This id is not valid" });
        }

        Cleaner.findByIdAndDelete(id)
            .then((cleaner) => {
                if (!cleaner) {
                    return response
                        .status(404)
                        .json({ error: "Cleaner not found" });
                }
                return response
                    .status(200)
                    .json({ message: "Successful operation" });
            })
            .catch((err) => {
                return response.status(500).json({ error: err.message });
            });
    },
};
