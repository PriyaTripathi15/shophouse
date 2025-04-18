import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// route auth user and get token
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user=await User.findOne({ email });
   if(user && (await user.matchPassword(password))){
         generateToken(res,user._id);
          
       res.status(200).json({
           _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
         
       });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }


}
);
// route get user profile
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if(user)
    {  generateToken(res,user._id);
        // set the cookie with the token
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }
        else
        {
            res.status(400);
            throw new Error('Invalid user data');
        }
    

}   
);
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires:new Date(0),
        secure:process.env.NODE_ENV==='production',
    });
    res.status(200).json({ message: 'Logout Successfully ' });
}   
);
// route get user profile
const getUserProfile = asyncHandler(async (req, res) => {
   const user=await User.findById(req.user._id);
    if(user){
         res.status(200).json({
              _id:user._id,
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
         });
    }
    else{
         res.status(404);
         throw new Error('User not found');
    }
}   
);
// get user by id  by admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get User By Id');
}   
);
// route update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updatedUser=await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
         });
    }
    else{
         res.status(404);
         throw new Error('User not found');
    }
}   
);
// route get all users by admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('Get Users');
}   
);
// route delete user by admin 
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete User');
}   
);
// route update user by admin 
const updateUser = asyncHandler(async (req, res) => {
    res.send('Update User');
}   
);
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser,
    updateUser
}