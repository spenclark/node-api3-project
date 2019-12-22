const validatePost = (req, res, next) => {
    const postBody = req.body;

    if(postBody) {
        next()
    } else if (postBody && !postBody.text) {
        res.status(400).json({ message: "No text found in rq"})
    } else {
        res.status(400).json({ message: "missing post data" });
    }
}

module.exports = validatePost