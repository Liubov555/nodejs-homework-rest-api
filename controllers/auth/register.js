const { User } = require("../../schema/schema");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`User with ${email} already exist`);
    };

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
        RequestBody: {
            email,
            subscription: "starter",
            avatarURL
        }
    });

    console.log(`User ${email} succssesfuly created`);
};

module.exports = register;