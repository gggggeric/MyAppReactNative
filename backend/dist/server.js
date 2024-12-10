"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: '*',
    methods: '*'
}));
app.use(body_parser_1.default.json());
// MongoDB Connection
const CONNECTION_URL = process.env.MONGO_URI;
if (!CONNECTION_URL) {
    throw new Error('MONGO_URI is not defined in the .env file');
}
mongoose_1.default
    .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB Atlas');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});
// Example Route
app.get('/', (req, res) => {
    res.send('NAGANA SIYA1');
});
//Login and Register Routes
app.use('/api/auth', authRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
//# sourceMappingURL=server.js.map