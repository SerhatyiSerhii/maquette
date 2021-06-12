import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';
import { audioDataBase, dataBase } from './database';

export class DataService {
    getAllMovies(callback: (data: IMovie[]) => void): void {
        setTimeout(() => {
            callback(dataBase);
        }, 300);
    }

    getAudioSourceById(id: number, callback: (audio: IAudio) => void): void {
        setTimeout(() => {
            callback(audioDataBase.find(entity => entity.id === id));
        }, 300);
    }
}
