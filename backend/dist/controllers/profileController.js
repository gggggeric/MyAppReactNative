"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig")); // Import from your config file
const User_1 = __importDefault(require("../models/User")); // Adjust the path accordingly
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params; // Get the user ID from the URL
        const { password } = req.body; // Get new password from the request body
        const profileImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Get file path from Multer
        const updatedFields = {};
        // If there is a profile image, upload to Cloudinary
        if (profileImage) {
            // Upload image to Cloudinary
            const result = yield cloudinaryConfig_1.default.uploader.upload(profileImage, {
                folder: 'user_profiles', // Cloudinary folder to store images
            });
            // Save the Cloudinary URL to the user profile
            updatedFields.profileImage = result.secure_url;
        }
        // If a password is provided, include it in the update
        if (password) {
            updatedFields.password = password; // Make sure password is hashed before saving
        }
        // Update the user in the database
        const user = yield User_1.default.findByIdAndUpdate(userId, updatedFields, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'Profile updated successfully',
            user,
        });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Error updating profile' });
    }
});
exports.updateProfile = updateProfile;
//# sourceMappingURL=profileController.js.map