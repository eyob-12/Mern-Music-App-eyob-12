const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection.js");
const Song = require("./models/song.js");
const Playlist = require("./models/playlist.js");
const bcrypt = require('bcryptjs');
const multer = require('multer'); // Middleware for handling multipart/form-data
const path = require('path');
const User = require("./models/User.js");
const Artiste = require('./models/artiste.js');
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/validateToken.js");
const mm = require('music-metadata');

dotenv.config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const JWT_SECRET = "gsfgnbdsfccjaGSBDHXx";

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:4000"],
}));

//DATABASE CONNECTION
connectDb();
// Routes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage: storage });


// Route for uploading music
// Function to format duration in milliseconds to "minutes:seconds" format
const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

app.post('/upload-music', upload.single('file'), async (req, res) => {
    try {
        const { originalname, size } = req.file;
        const { title, coverImage, artistes } = req.body;

        const metadata = await mm.parseFile(req.file.path);
        // Format duration into "minutes:seconds" format
        const duration = formatDuration(metadata.format.duration * 1000); // Extract duration from metadata

        const newSong = new Song({
            title: title || originalname,
            coverImage: coverImage || "https://image.pngaaa.com/851/2152851-middle.png",
            filename: req.file.filename,
            artistes: artistes || [],
            duration: duration,
            size: size,
        });

        await newSong.save();
        res.status(200).json({ message: 'File uploaded successfully', data: newSong });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

app.get("/songs", async (req, res) => {
    try {
        const songs = await Song.find().populate('artistIds', 'name').select('-artistIds -__v');
        if (!songs) {
            return res.status(400).json({ message: "An error occurred!" });
        }
        const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));

        res.status(200).json(shuffledSongs);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


app.get("/songs/top", async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.get("/songs/releases", async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
app.get("/songs/popular", async (req, res) => {
    const songs = await Song.find({});

    const result = songs.slice(-5, -1);
    const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));

    res.status(200).json(shuffledSongs);

});


app.post("/playlist/createPlaylist", verifyToken, async (req, res) => {
    try {
        const { id, username } = req.user;
        const { title, description, songIds } = req.body;
        const user = await User.findById(id);

        if (!title || !songIds) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        await Promise.all(
            songIds.map(async (id) => {
                const songExists = await Song.findById(id);
                if (!songExists) {
                    return res.status(404).json({ message: "Song not found" });
                }
            })
        );

        const newPlaylist = await Playlist.create({
            title,
            description,
            userId: id,
            userName: username,
            songs: songIds,
        });

        if (!newPlaylist) {
            return res.status(400).json({ message: "An error occured!" });
        }

        user.playlists.push(newPlaylist.id);
        await user.save();

        res.status(201).json(newPlaylist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "got error" })
    }
});
app.get("/getPlaylists", async (req, res) => {
    try {
        const playlist = await Playlist.find();
        res.status(200).json(playlist);
    } catch (error) {
        console.error(error);
        res.status(500).send("server got error!");
    }
});
app.get("/playlists/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const playlist = await Playlist.findById(id);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found!" });
        }

        let songs = [];

        await Promise.all(
            playlist.songs.map(async (songId) => {
                const playlistSong = await Song.findById(songId);
                if (!playlistSong) {
                    return res.status(404).json({ message: "Song not found" });
                } else {
                    songs.push(playlistSong);
                }
            })
        );

        res.status(200).json({ ...playlist.toObject(), songs });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.patch("/playlists/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, songIds } = req.body;
    const playlist = await Playlist.findById(id);

    if (!title || !songIds) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    if (!playlist) {
        return res.status(400).json({ message: "Playlist not found!" });
    }

    if (playlist.userId !== userId) {
        return res
            .status(403)
            .json({ message: "You are not allowed to edit other users' playlists!" });
    }

    await Promise.all(
        songIds.map(async (id) => {
            const songExists = await Song.findById(id);
            if (!songExists) {
                return res.status(404).json({ message: "Song not found" });
            }
        })
    );

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        id,
        { title, description, songs: songIds },
        {
            new: true,
        }
    );

    if (!updatedPlaylist) {
        return res.status(400).json({ message: "Playlist not updated!" });
    }
    res.status(200).json(updatedPlaylist);
})


app.get("/songs/random", async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (err) {
        console.log(err);
        res.status(500).send("server got error!")
    }
});

app.post("/user/register", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const userData = await User.create({
            email,
            username,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        const accessToken = jwt.sign(
            {
                user: {
                    id: userData.id,
                    userData: userData.username,
                },
            },
            JWT_SECRET
        );
        const returnedUser = {
            id: userData.id,
            username: userData.username,
            favorites: userData.favorites,
            playlists: userData.playlists,
        };

        res.status(200).json({ user: returnedUser, token: accessToken });
        console.log(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "An error occurred while registering the user" });
    }
});

app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    // const userData = await User.findOne({ email });
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    const pass = await bcrypt.compareSync(password, user.password);
    if (!pass) {
        return res.status(400).json({ message: "Incorrect password!" });
    }
    const accessToken = jwt.sign(
        {
            user: {
                id: user.id,
                email: user.email,
            },
        }, JWT_SECRET);
    const returnedUser = {
        id: user.id,
        username: user.username,
        favorites: user.favorites,
        playlists: user.playlists,
    };
    res.status(200).json({ user: returnedUser, token: accessToken });
});

app.get("/artistes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const artiste = await Artiste.findById(id);
        if (!artiste) {
            return res.status(404).json({ msg: "Artist not found" });
        }

        const artisteSongs = await Song.find({ artistIds: id });
        if (!artisteSongs) {
            return res.status(400).json({ message: "An error occurred while fetching artiste songs!" });
        }

        res.status(200).json({ ...artiste._doc, songs: artisteSongs });
    } catch (error) {
        console.error("Error fetching artiste details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/users/favorites", verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        console.log("User ID:", id);

        const user = await User.findById(id);
        if (!user) {
            console.error("User not found!");
            return res.status(404).json({ message: "User not found!" });
        }

        const userFavorites = await Promise.all(
            user.favorites.map((id) => Song.findById(id))
        );

        if (!userFavorites) {
            console.error("User favorites not found!");
            return res.status(404).json({ message: "User favorites not found!" });
        }

        console.log("User favorites:", userFavorites);
        res.status(200).json(userFavorites);
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.patch("/songs/like/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const song = await Song.findById(id);
        const user = await User.findById(userId);

        if (!user) {
            return res.json(404).json({ message: "User not found!" });
        }
        if (!song) {
            return res.json(404).json({ message: "Song not found!" });
        }

        const isLiked = song.likes.get(userId);

        if (isLiked) {
            song.likes.delete(userId);
            user.favorites = user.favorites.filter((songId) => songId !== id);
        } else {
            song.likes.set(userId, true);
            user.favorites.push(id);
        }

        const savedSong = await song.save();
        const savedUser = await user.save();

        if (!savedSong || !savedUser) {
            return res.status(400).json({ message: "An error occured" });
        }

        const returnUser = {
            id: savedUser.id,
            username: savedUser.username,
            favorites: savedUser.favorites,
            playlists: savedUser.playlists,
        };

        res.status(200).json(returnUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Start the server
const port = process.env.PORT || 6000;
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});
