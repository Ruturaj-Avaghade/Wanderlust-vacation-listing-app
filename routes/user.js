const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const usersController = require("../controllers/users.js");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleware.js");


router.route("/signup")
// get signup page routes
.get(usersController.getSignUpPage)

//signup user
.post( usersController.signUp);


router.route("/login")
//get login page route
.get(usersController.getLoginPage)

//login route
.post(saveRedirectUrl,
    passport.authenticate("local",
    {
        failureRedirect: "/user/login",
        failureFlash : true,
    }
    ),
   usersController.afterLogin
);


// logout route
router.get("/logout", usersController.logoutUser);


module.exports = router;


