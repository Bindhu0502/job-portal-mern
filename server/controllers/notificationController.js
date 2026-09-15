import Notification from "../models/Notification.js";




// =====================================
// GET USER NOTIFICATIONS
// GET /api/notifications
// =====================================

export const getNotifications = async(req,res)=>{


try{


const notifications = await Notification.find({

user:req.user._id

})

.sort({

createdAt:-1

});





const unreadCount = notifications.filter(

notification =>

!notification.isRead

).length;







res.status(200).json({


success:true,


notifications,


unreadCount



});



}


catch(error){


console.log(

"Get Notifications Error:",

error

);



res.status(500).json({


success:false,


message:error.message


});



}


};









// =====================================
// MARK SINGLE NOTIFICATION READ
// PUT /api/notifications/:id
// =====================================


export const markNotificationRead = async(req,res)=>{


try{


const notification = await Notification.findOne({

_id:req.params.id,

user:req.user._id

});







if(!notification){


return res.status(404).json({


success:false,

message:"Notification not found"


});


}






notification.isRead=true;


await notification.save();







res.status(200).json({


success:true,


message:"Notification marked as read",


notification



});




}


catch(error){


console.log(

"Mark Notification Error:",

error

);



res.status(500).json({


success:false,


message:error.message


});


}



};












// =====================================
// MARK ALL NOTIFICATIONS READ
// PUT /api/notifications/read-all
// =====================================


export const markAllRead = async(req,res)=>{


try{


const result = await Notification.updateMany(


{


user:req.user._id,


isRead:false


},


{


$set:{


isRead:true


}


}


);







res.status(200).json({


success:true,


message:"All notifications marked as read",


modifiedCount:result.modifiedCount



});



}


catch(error){


console.log(

"Mark All Read Error:",

error

);



res.status(500).json({


success:false,


message:error.message


});


}



};









// =====================================
// DELETE ALL NOTIFICATIONS (OPTIONAL)
// DELETE /api/notifications
// =====================================


export const clearNotifications = async(req,res)=>{


try{


await Notification.deleteMany({

user:req.user._id

});





res.status(200).json({


success:true,


message:"Notifications cleared"


});



}

catch(error){


res.status(500).json({


success:false,


message:error.message


});


}



};