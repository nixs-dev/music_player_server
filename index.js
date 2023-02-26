import http from "http";
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import db from "./db.js";
import PlaylistController from "./src/controllers/Playlist.js";
import SongController from "./src/controllers/Song.js";


const app = express();
const uploader = multer({ dest: "./tmp/" });

app.use(express.json());
app.use(express.static("./public"));
app.use(cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"]
}));

app.post("/create", uploader.single("cover"), PlaylistController.create);
app.get("/playlist", PlaylistController.getPlaylists);
app.get("/playlist/:playlist", PlaylistController.getContent);
app.post("/playlist/:playlist/add", uploader.single("song"), SongController.add);

app.listen(8000, () => {
    console.log("Server is running...");
});


// Setup storage

if(!fs.existsSync("./public/storage/playlists")) {
    fs.mkdirSync("./public/storage/playlists");
}

// Sync with Database tables

db.sync().then(() => {
    console.log("Connected to Database");
}).catch((error) => {
    console.log(error);
})