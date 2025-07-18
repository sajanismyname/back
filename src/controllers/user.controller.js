import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from '../utils/apiError.js'
import {User} from '../models/user.models.js'

const registerUser = asyncHandler(async (req, res)=>{
    // res.status(200).json({
    //     message: "ok"
    // })

    const{ fullName, email, Username, password}= req.body
    console.log("email: ", email);

    if ( [fullName, email, Username, password].some((field) => field?.trim() === '' )){
        throw new apiError(400, "All fields are required to be filled.")
    }

    const existedUser = User.findOne({
        $or:[{Username}, {email}]
    })
    
    if (existedUser){
        throw new apiError(409, "User with email or username already exists.")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    console.log(req.files);

    if(!avatarLocalPath) {
        throw new apiError(400, "Avatar file is requiered!")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400,"avatar file is required")
    }

    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: Username.toLowerCase()
    }
    )
})


export {registerUser}