"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
// Use express.json() middleware to parse JSON request bodies
app.use(express_1.default.json());
// Serve static files (images) from the 'images' directory
app.use('/images', express_1.default.static(path_1.default.join(__dirname, './images')));
// Configure CORS middleware
app.use((0, cors_1.default)());
// Use routes defined in routes.ts
app.use(routes_1.default);
const port = 1337;
// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    throw new Error('MongoDB URI is not defined in the environment variables.');
}
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log('Server is running on port ${ port }');
});
exports.default = app;
//# sourceMappingURL=server.js.map