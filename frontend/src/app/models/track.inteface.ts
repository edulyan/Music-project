import { IComment } from './comment.interface';

export interface ITrack {
  id: number;
  name: string;
  artist: string;
  text: string;
  pictureSrc: File;
  audioSrc: File;
  comments: IComment[];
}
