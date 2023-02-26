import { SongModel } from "../models/Song.js";


export default class SongController {
    static getSongs(request, response) {
        let playlist = request.params.playlist;
        
        SongModel.getByPlaylist(playlist).then((songs) => {
            response.json({
                success: true,
                content: songs
            })
        }).catch((error) => {
            response.json({
                success: false,
                content: error
            })
        });
    }

    static add(request, response) {
        let playlist = request.params.playlist;
        let song = request.file;

        SongModel.saveToPlaylist(playlist, song).then(() => {
            response.json({
                success: true,
                content: null
            });
        }).catch((error) => {
            response.json({
                success: false,
                content: error
            });
        });
    }
}