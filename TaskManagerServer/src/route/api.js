const express=require('express')
const route=express.Router();
const usersController=require('../controller/usersController');
const tasksController=require('../controller/tasksController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

route.get('/',usersController.status);//Not uses

//User Routes
route.post("/registration",usersController.registration);
route.post("/login",usersController.login);
route.post("/profileUpdate",AuthVerifyMiddleware,usersController.profileUpdate);
route.get("/profileDetails",AuthVerifyMiddleware,usersController.profileDetails);

//Recovery User
route.get("/RecoverVerifyEmail/:email",usersController.RecoverVerifyEmail);
route.get("/RecoverVerifyOTP/:email/:otp",usersController.RecoverVerifyOTP);
route.post("/RecoverResetPass",usersController.RecoverResetPass);


//Tasks
route.post("/createTask",AuthVerifyMiddleware,tasksController.createTask);
route.get("/deleteTask/:id",AuthVerifyMiddleware,tasksController.deleteTask);
route.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,tasksController.updateTaskStatus);
route.get("/findTasks",AuthVerifyMiddleware,tasksController.findTasks);//Not uses
route.get("/findTasksById/:id",AuthVerifyMiddleware,tasksController.findTasksById);//Not work properly

route.get("/listTaskByStatus/:status",AuthVerifyMiddleware,tasksController.listTaskByStatus); 
module.exports=route;

route.get("/TaskList/:status/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,tasksController.TaskList);

route.get("/taskStatusCount",AuthVerifyMiddleware,tasksController.taskStatusCount); 
module.exports=route;