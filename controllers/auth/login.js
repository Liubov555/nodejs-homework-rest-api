const { User } = require("../../schema/schema");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.password) {
        throw new Unauthorized("Email or password is wrong")
    };

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "in" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email,
            subscription: "starter"
        }
    });
};

module.exports = login;