import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Adjust to match your model path

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  console.log('Request received at updateProfile controller.');

  // Log the request body (name and password)
  console.log('Request body:', req.body);

  // Log the uploaded file
  console.log('Uploaded file:', req.file);

  const { name, password } = req.body;
  const userId = req.params.id;

  try {
    // Prepare update data
    const updateData: { name?: string; password?: string; profileImage?: string } = {};
    if (name) updateData.name = name;

    if (password) {
      // Hash password if provided
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (req.file) {
      // Add file path to updateData if an image is uploaded
      updateData.profileImage = req.file.filename;
    }

    console.log('Final update data:', updateData); // Log the final update object

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return; // End function here if user not found
    }

    console.log('User updated successfully:', updatedUser); // Log the updated user
    res.status(200).json(updatedUser); // Send updated user back to the client
  } catch (error) {
    console.error('Error in updateProfile:', error); // Log any errors
    res.status(500).json({ message: 'Server error', error });
  }
};
