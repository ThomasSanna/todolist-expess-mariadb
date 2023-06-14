module.exports = function (app) {
    app.post("/logout", (req, res) => {
        req.session.destroy();
        console.log('====================================');
        console.log('User logged out');
        console.log('====================================');
        res.redirect('http://localhost:3000/');
    });
}