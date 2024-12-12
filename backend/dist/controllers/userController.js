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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User")); // Adjust to match your model path
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request received at updateProfile controller.');
    // Log the request body (name and password)
    console.log('Request body:', req.body);
    // Log the uploaded file
    console.log('Uploaded file:', req.file);
    const { name, password } = req.body;
    const userId = req.params.id;
    try {
        // Prepare update data
        const updateData = {};
        if (name)
            updateData.name = name;
        if (password) {
            // Hash password if provided
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            updateData.password = hashedPassword;
        }
        if (req.file) {
            // Add file path to updateData if an image is uploaded
            updateData.profileImage = req.file.filename;
        }
        console.log('Final update data:', updateData); // Log the final update object
        // Update the user
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return; // End function here if user not found
        }
        console.log('User updated successfully:', updatedUser); // Log the updated user
        res.status(200).json(updatedUser); // Send updated user back to the client
    }
    catch (error) {
        console.error('Error in updateProfile:', error); // Log any errors
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateProfile = updateProfile;
//# sourceMappingURL=userController.js.map