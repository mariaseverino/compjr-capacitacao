import fs from "fs";
import path from "path";

export default {
    image(request, response) {
        const filePath = path.resolve(
            `./uploads/${request.params.path}/${request.params.filename}`
        );

        console.log(request.params.path, request.params.filename);
        fs.exists(filePath, (exists) => {
            if (exists) {
                return response.sendFile(filePath);
            } else {
                return response.status(404).json({ error: "File not found" });
            }
        });
    },
};
