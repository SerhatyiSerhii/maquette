import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    public getAllMovies(callback: (data: IMovie[]) => void): void {
        const xml = new XMLHttpRequest();

        xml.open('GET', 'http://localhost:8080/movies');

        xml.responseType = 'json';

        xml.send();

        xml.onload = () => {
            callback(xml.response);
        }
    }

    public getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
        const xml = new XMLHttpRequest();

        xml.open('GET', `http://localhost:8080/audios?id=${id}`);

        xml.responseType = 'json';

        xml.send();

        xml.onload = () => {
            callback(xml.response);
        }
    }
}
