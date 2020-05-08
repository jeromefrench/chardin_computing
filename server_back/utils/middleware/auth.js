

module.exports = (req, res, next) => {
    if (req.user) {
    	console.log("le user exist");
        next();
    } else {
		res.send("need auth")
    }
};

