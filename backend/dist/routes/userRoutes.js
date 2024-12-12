"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../config/multer")); // Import multer configuration
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.put('/profile/:id', multer_1.default.single('profileImage'), userController_1.updateProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map