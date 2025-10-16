import multer from "multer";

const uploaddataonmulter = multer({storage: multer.diskStorage({})});

export default uploaddataonmulter;