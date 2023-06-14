module.exports = function (app) {
    app.get("/user", (req, res) => {
        if (req.session.user) {
            res.json({ data: req.session.user });
        } else {
            res.json({ error: "Not logged in" });
        }
    });
}
