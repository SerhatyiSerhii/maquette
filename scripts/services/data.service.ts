import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    // public getAllMovies(): Promise<IMovie[]>;
    public getAllMovies(callback: (data: IMovie[]) => void): void {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${this.url}movies`);

        xhr.responseType = 'json';

        xhr.send();

        xhr.addEventListener('load', () => {
            callback(xhr.response);
        });
    }

    // public getAudioSourceById(id: number): Promise<IAudio>;
    public getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
        const xhr = new XMLHttpRequest();

        const json = JSON.stringify({
            id: id, // TODO: you can simplify if variable and key have same name
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
