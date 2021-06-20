import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    // public getAllMovies(): Promise<IMovie[]>;
    public async getAllMovies(): Promise<IMovie[]> {
        // Method without xhr
        // const response = fetch(`${this.url}movies`);

        // const responseJSON: Promise<IMovie[]>  = (await response).json();

        // return responseJSON;

        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${this.url}movies`);

        xhr.responseType = 'json';

        xhr.send();

        return new Promise<IMovie[]>(resolve => {
           xhr.addEventListener('load', () => {
               resolve(xhr.response);
           })
        });
    }

    // public getAllMovies(callback: (data: IMovie[]) => void): void {
    //     const xhr = new XMLHttpRequest();

    //     xhr.open('GET', `${this.url}movies`);

    //     xhr.responseType = 'json';

    //     xhr.send();

    //     xhr.addEventListener('load', () => {
    //         callback(xhr.response);
    //     });
    // }

    // public getAudioSourceById(id: number): Promise<IAudio>;
    public async getAudioSourceById(id: number): Promise<IAudio> {
        // Method without xhr
        // const settings = {
        //     method: 'POST',
        //     body: JSON.stringify({id}),
        //     headers: {
        //         'Content-type': 'application/json; charset=utf-8'
        //     }
        // }

        // const response = fetch(`${this.url}audios`, settings);

        // const responseJSON: Promise<IAudio> = (await response).json();

        // return responseJSON;

        const xhr = new XMLHttpRequest();

        const json = JSON.stringify({
            id
        });

        xhr.open('POST', `${this.url}audios`);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.responseType = 'json';

        xhr.send(json);

        return new Promise<IAudio>(resolve => {
            xhr.addEventListener('load', () => {
                resolve(xhr.response);
            });
        })
    }

    // public getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
    //     const xhr = new XMLHttpRequest();

    //     const json = JSON.stringify({
    //         id // TODO: you can simplify if variable and key have same name     Got it. Corrected :)
    //     });

    //     xhr.open('POST', `${this.url}audios`);

    //     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    //     xhr.responseType = 'json';

    //     xhr.send(json);

    //     xhr.addEventListener('load', () => {
    //         callback(xhr.response);
    //     });
    // }
}
