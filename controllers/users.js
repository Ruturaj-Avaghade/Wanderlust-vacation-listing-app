const User = require("../models/user.js");
// const passport = require("passport");

module.exports.getSignUpPage = (req,res)=>{
    res.render("./users/signup.ejs")
};

module.exports.signUp = async(req,res,next)=>{
    
   try{
    let {username,email,password} = req.body;
    let newUser = new User({username,email});
    
    let registeredUser = await User.register(newUser, password);
    
    req.login(registeredUser,(err)=>{ // automatically login after signup
        
        if(err)
        {
          return next(err);
        }
        req.flash("success" , "Welcom to Wanderlust");
        res.redirect("/listings");
    })
    
   }
   catch(e){
    
    req.flash("error" , e.message);
    res.redirect("/user/signup");

   }
};

module.exports.getLoginPage = (req,res)=>{

     if(req.query.redirectUrl)
     {
        req.session.redirectUrl = req.query.redirectUrl;
     }
    res.render("./users/login.ejs");

}

module.exports.afterLogin = (req,res)=>{
        
        req.flash("success","Welcome to Waderlust!");
        let redirectUrl = res.locals.redirectUrl;
        res.redirect(redirectUrl);   
    }

module.exports.logoutUser = (req,res,next)=>{

    req.logout((err)=>{

        if(err){
            return next(err);
        }
        
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });

}    