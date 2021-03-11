export class StarWarsCharacter {
  birth_year: string;
  created: Date;
  edited: Date;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: []
  starships: string[];
  url: string;
  vehicles: string[];
  side: string;

  constructor(name: string, side: string) {
    this.name = name;
    this.side = side;
  }
}
