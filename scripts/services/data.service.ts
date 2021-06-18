import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    public getAllMovies(callback: (data: IMovie[]) => void): void {
        const xml = new XMLHttpRequest(); // TODO: I'd say that is xhr, not xml

        // TODO: you can skip base url because if address is not url-like - it will automatically add base url
        // but usually base url is stored in config file and just used from there to build whole url string
        // so, better to store base url in property for now
        xml.open('GET', 'http://localhost:8080/movies');

        xml.responseType = 'json';

        xml.send();

        xml.onload = () => { // TODO: you can also use addEventListener as it's more modern way
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
