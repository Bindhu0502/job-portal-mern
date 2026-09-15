import User from "../models/User.js";


// GET ALL USERS

export const getAllUsers = async(req,res)=>{

 try{

  const users = await User.find()
    .select("-password")
    .sort({
      createdAt:-1
    });


  res.json({
    users
  });


 }
 catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};




// UPDATE USER ROLE

export const updateUserRole = async(req,res)=>{

 try{

  const user =
   await User.findById(
    req.params.id
   );


  if(!user){

   return res.status(404).json({
    message:"User not found"
   });

  }


  user.role=req.body.role;


  await user.save();


  res.json({
    message:"Role updated"
  });


 }
 catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};




// BLOCK / UNBLOCK USER

export const updateUserStatus = async(req,res)=>{


 try{


  const user =
   await User.findById(
    req.params.id
   );


  if(!user){

   return res.status(404).json({
    message:"User not found"
   });

  }



  user.status=req.body.status;


  await user.save();



  res.json({
    message:"Status updated"
  });



 }
 catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};




// DELETE USER

export const deleteUser = async(req,res)=>{


 try{


  await User.findByIdAndDelete(
    req.params.id
  );


  res.json({
    message:"User deleted"
  });


 }
 catch(error){

  res.status(500).json({
    message:error.message
  });

 }

};