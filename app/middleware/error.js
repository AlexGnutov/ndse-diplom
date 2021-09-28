module.exports = (req, res) => {
    res.status(400).json("404 | страница не найдена | error middleware");
};
