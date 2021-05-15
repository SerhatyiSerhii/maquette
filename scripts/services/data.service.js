import { audioDataBase } from '../../server/audio-data-base.mjs';
import { dataBase } from '../../server/data-base.mjs';

export class DataService {
    getAllMovies() {
        return dataBase;
    }

    getAudioSourceById(id) {
        return audioDataBase.find(entity => entity.id === id);
    }
}
