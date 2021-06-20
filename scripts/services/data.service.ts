import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    public getAllMovies(): Promise<IMovie[]> {
        // const xhr = new XMLHttpRequest(); // TODO: use fetch api     Corrected

        // xhr.open('GET', `${this.url}movies`);

        // xhr.responseType = 'json';

        // xhr.send();

        // return new Promise<IMovie[]>(resolve => {
        //    xhr.addEventListener('load', () => {
        //        resolve(xhr.response);
        //    })
        // });

        const response = fetch(`${this.url}movies`);

        return new Promise<IMovie[]>(resolve => {
            response.then(result => {
                resolve(result.json());
            })
        })
    }

    public getAudioSourceById(id: number): Promise<IAudio> {
        // const xhr = new XMLHttpRequest(); // TODO: use fetch api     Corrected

        // const json = JSON.stringify({
        //     id
        // });

        // xhr.open('POST', `${this.url}audios`);

        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // xhr.responseType = 'json';

        // xhr.send(json);

        // return new Promise<IAudio>(resolve => {
        //     xhr.addEventListener('load', () => {
        //         resolve(xhr.response);
        //     });
        // })

        const settings = {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        }

        const response = fetch(`${this.url}audios`, settings);

        return new Promise<IAudio>(resolve => {
            response.then(result => {
                resolve(result.json());
            })
        })
    }
}
