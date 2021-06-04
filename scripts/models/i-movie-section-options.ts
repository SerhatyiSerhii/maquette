import { IVideo } from './i-video';

export interface IMovieSectionOptions {
    id: number;
    position: number;
    name: string;
    bannerPath?: string;
    shortDescription?: string;
    description: string;
    video?: IVideo;
}