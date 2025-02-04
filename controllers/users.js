const User= require("../models/user");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Handle error, return to prevent further execution
            }
            req.flash("success", "Welcome to Wanderlust!"); // Flash message *inside* the callback
            return res.redirect("/listings"); // Redirect *inside* the callback
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup"); // Return here to prevent another redirect
    }
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust! You are logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out now!");
        res.redirect("/listings");
    })
};