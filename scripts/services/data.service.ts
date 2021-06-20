import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    public getAllMovies(): Promise<IMovie[]> {
        const response = fetch(`${this.url}movies`);

        return new Promise<IMovie[]>(resolve => { // TODO: fetch returns promise itself
            response.then(result => {
                resolve(result.json());
            })
        })
    }

    public getAudioSourceById(id: number): Promise<IAudio> {
        const settings = {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        }

        const response = fetch(`${this.url}audios`, settings);

        return new Promise<IAudio>(resolve => { // TODO: fetch returns promise itself
            response.then(result => {
                resolve(result.json());
            })
        })
    }
}
