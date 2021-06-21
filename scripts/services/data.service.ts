import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';

export class DataService {
    private url = 'http://localhost:8080/';

    public async getAllMovies(): Promise<IMovie[]> {
        return (await fetch(`${this.url}movies`)).json();
    }

    public async getAudioSourceById(id: number): Promise<IAudio> {
        return (await fetch(`${this.url}audios/${id}`)).json();
    }
}
