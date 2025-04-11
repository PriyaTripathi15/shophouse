import jwt from 'jsonwebtoken';
 const generateToken = (res,userId) => {
    const token=jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn:'20d'
    });
    //set jwt as httpOnly cookie
    res.cookie('jwt', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:20*24*60*60*1000 // 20 days
    });
 }
export default generateToken;