import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';
// import { audioDataBase, dataBase } from './database';

export class DataService {
    getAllMovies(callback: (data: IMovie[]) => void): void {
        // setTimeout(() => {
        //     callback(dataBase);
        // }, 300);

        const xml = new XMLHttpRequest();

        xml.open('GET', 'http://localhost:8080/movies');

        xml.responseType = 'json';

        xml.send();

        xml.onload = () => {
            callback(xml.response);
        }
    }

    getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
        // setTimeout(() => {
        //     callback(audioDataBase.find(entity => entity.id === id));
        // }, 300);

        const xml = new XMLHttpRequest();

        xml.open('GET', `http://localhost:8080/audios?id=${id}`);

        xml.responseType = 'json';

        xml.send();

        xml.onload = () => {
            callback(xml.response);
        }
    }
}
