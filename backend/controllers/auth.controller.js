import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/verifyUser.js';
export const signup = async(req, res, next) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: "Username already in use" });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid Data" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signin = async(req, res, next) => {
    const { userName, password } = req.body;
    try {
        console.log(`Attempting sign-in with username: ${userName}`); // Debug log

        const validUser = await User.findOne({ userName });
        if (!validUser) {
            console.error(`User not found: ${userName}`);
            return res.status(404).json({ error: 'Wrong Credentials!' });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            console.error(`Invalid password for user: ${userName}`);
            return res.status(401).json({ error: 'Wrong credentials!' });
        }

        generateTokenAndSetCookie(validUser._id, res);
        res.status(200).json({
            _id: validUser._id,
            fullName: validUser.fullName,
            userName: validUser.userName,
            profilePic: validUser.profilePic,
        });
    } catch (error) {
        console.error(`Internal Server Error during sign-in: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
};

export const signOut = async(req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};