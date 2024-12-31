"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./Routes/auth.routes"));
const message_routes_1 = __importDefault(require("./Routes/message.routes"));
const DB_1 = require("./lib/DB");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const socketIO_1 = require("./lib/socketIO");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const _dirname = path_1.default.dirname(__filename);
socketIO_1.app.use(express_1.default.json());
socketIO_1.app.use((0, cookie_parser_1.default)());
socketIO_1.app.use((0, cors_1.default)({
    // todo: update origin later as the frontend route
    origin: "http://localhost:5173",
    credentials: true,
}));
socketIO_1.app.use("/api/v1/auth", auth_routes_1.default);
socketIO_1.app.use("/api/v1/messages", message_routes_1.default);
if (process.env.NODE_ENV === "production") {
    socketIO_1.app.use(express_1.default.static(path_1.default.resolve(_dirname, "../public/dist")));
    socketIO_1.app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(_dirname, "../public/dist", "index.html"));
    });
}
(0, DB_1.connectDB)().then(() => {
    socketIO_1.server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
