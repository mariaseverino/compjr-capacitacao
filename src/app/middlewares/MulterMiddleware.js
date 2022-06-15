import multer from "multer";
import Slugify from "../../utils/Slugify.js";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "uploads/images");
    },
    filename: (request, file, callback) => {
        const [filename, extension] = file.originalname.split(".");

        callback(null, `${Slugify(filename)}.${extension}`);
    },
});

export default multer({ storage });
