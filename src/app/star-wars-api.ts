import { StarWarsCharacter } from './star-wars-character';

export class StarWarsApi {
  count: number;
  next: string;
  previous: string[];
  results: StarWarsCharacter[];
}
