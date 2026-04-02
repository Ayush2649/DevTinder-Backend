const validateEditProfile = (req) => {
    const alloedEditFields = ["firstName", "lastName", "about", "photoUrl", "skills", "age", "gender"];

    const isEditAllowed = Object.keys(req.body).every(field => alloedEditFields.includes(field));

    return isEditAllowed;
};

module.exports = {
    validateEditProfile,
}