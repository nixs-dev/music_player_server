import db from "../../db.js";
import fs from "fs";
import { SongDB } from "./Song.js";
import { DataTypes } from "sequelize";


const PlaylistDB = db.define("playlist", {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    cover: {
        type: DataTypes.BLOB("long")
    }
});

// RELATIONSHIP

PlaylistDB.hasMany(SongDB, {
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});
SongDB.belongsTo(PlaylistDB, {
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});


class PlaylistModel extends PlaylistDB {
    static get(playlist) {
        return this.findOne({
            where: {
                id: playlist
            }
        });
    }

    static createPlaylist(playlistData) {
        return new Promise((resolve, reject) => {
            this.create(playlistData).then((createdPlaylist) => {
                fs.mkdirSync(`./public/storage/playlists/${createdPlaylist.id}`);
                resolve();
            }).catch((error) => {
                reject(error);
            })       
        });
    }
}

export { PlaylistModel, PlaylistDB };