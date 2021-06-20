import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    public getAllMovies(): Promise<IMovie[]> {
        return fetch(`${this.url}movies`).then(response => response.json());
    }

    public getAudioSourceById(id: number): Promise<IAudio> {
        return fetch(`${this.url}audios/${id}`).then(response => response.json());
    }
}
