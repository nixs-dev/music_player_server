import { SongModel } from "../models/Song.js";
import { PlaylistModel } from "../models/Playlist.js";


export default class PlaylistController {
    static create(request, response) {
        PlaylistModel.createPlaylist({
            name: request.body.name,
            description: request.body.description,
            cover: request.file ? request.file.buffer : null
        }).then(() => {
            response.json({
                success: true,
                content: null
            });
        }).catch((error) => {
            response.json({
                success: false,
                content: error
            });
        })
    }

    static getPlaylists(request, response) {
        PlaylistModel.findAll({}).then((playlists) => {
            response.json({
                success: true,
                content: playlists
            });
        }).catch((error) => {
            response.json({
                success: false,
                content: error
            });
        })
    }

    static getContent(request, response) {
        let content = {
            playlist: null,
            songs: null
        }

        PlaylistModel.get(request.params.playlist).then((playlist) => {
            content.playlist = playlist;

            SongModel.getByPlaylist(request.params.playlist).then((songs) => {
                content.songs = songs;

                response.json({
                    success: true,
                    content: content
                });
            }).catch((error) => {
                response.json({
                    success: false,
                    content: error
                });
            })
        }).catch((error) => {
            response.json({
                success: false,
                content: error
            });
        });
    }
}