import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    public getAllMovies(callback: (data: IMovie[]) => void): void {
        const xhr = new XMLHttpRequest(); // TODO: I'd say that is xhr, not xml     Corrected

        // TODO: you can skip base url because if address is not url-like - it will automatically add base url
        // but usually base url is stored in config file and just used from there to build whole url string
        // so, better to store base url in property for now

        // Corrected
        xhr.open('GET', `${this.url}movies`);

        xhr.responseType = 'json';

        xhr.send();

        // xhr.onload = () => { // TODO: you can also use addEventListener as it's more modern way   Corrected

        xhr.addEventListener('load', () => {
            callback(xhr.response);
        });
    }

    public getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
        const xhr = new XMLHttpRequest();

        // xhr.open('GET', `${this.url}audios?id=${id}`);

        // xhr.responseType = 'json';

        // xhr.send();

        // xhr.addEventListener('load', () => {
        //     callback(xhr.response);
        // });

        const json = JSON.stringify({
            id: id,
        });

        xhr.open('POST', `${this.url}audios`);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.responseType = 'json';

        xhr.send(json);

        xhr.addEventListener('load', () => {
            callback(xhr.response);
        });
    }
}
