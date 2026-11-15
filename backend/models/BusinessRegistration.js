const mongoose = require("mongoose");

const businessRegistrationSchema = new mongoose.Schema(
{
    businessName: {
        type: String,
        required: true
    },

    ownerName: {
        type: String,
        required: true
    },

    registrationNumber: {
        type: String,
        required: true
    },

    businessType: {
        type: String,
        required: true
    },

    province: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "BusinessRegistration",
    businessRegistrationSchema
);