"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Connected with Express, Rest API");
});
app.use(express_1.default.json());
app.listen(3000, () => console.log("Server Started"));
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected Successfully"))
    .catch((error) => console.error("Connection error:", error));
