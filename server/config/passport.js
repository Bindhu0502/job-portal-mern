import dotenv from "dotenv";

dotenv.config();


import passport from "passport";

import {
Strategy as GitHubStrategy
} from "passport-github2";


import User from "../models/User.js";





passport.use(


new GitHubStrategy(


{

clientID:

process.env.GITHUB_CLIENT_ID,


clientSecret:

process.env.GITHUB_CLIENT_SECRET,


callbackURL:

"http://localhost:5000/api/auth/github/callback"


},



async(

accessToken,

refreshToken,

profile,

done

)=>{


try{


console.log(
"GitHub Profile:",
profile
);





const email =

profile.emails?.[0]?.value || 
`${profile.username}@github.com`;








let user = await User.findOne({

email

});







if(!user){


user = await User.create({


name:

profile.displayName || profile.username,


email,


password:

Math.random()

.toString(36)

.substring(2,12),


role:"candidate",


accountStatus:"approved"


});


}







return done(

null,

user

);



}

catch(error){


console.log(

"GitHub User Error:",

error

);


return done(

error,

null

);


}



}


)


);









passport.serializeUser(

(user,done)=>{


done(

null,

user._id

);


}

);









passport.deserializeUser(

async(

id,

done

)=>{


try{


const user = await User.findById(id);


done(

null,

user

);


}

catch(error){


done(

error,

null

);


}


}

);








export default passport;