import { IAudio } from '../models/i-audio';
import { IMovie } from '../models/i-movie';
import { audioDataBase, dataBase } from './database';

export class DataService {
    getAllMovies(): IMovie[] {
        return dataBase;
    }

    getAudioSourceById(id: number): IAudio {
        return audioDataBase.find(entity => entity.id === id);
    }
}
