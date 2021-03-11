import { StarWarsApi } from './star-wars-api';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LogService } from './log.service';
import { StarWarsCharacter } from './star-wars-character';

@Injectable()
export class StarWarsService {
  private characters: StarWarsCharacter[];

  private logService: LogService;
  charactersChanged = new Subject<void>();
  private httpClient: HttpClient;

  constructor(logService: LogService, httpClient: HttpClient) {
    this.logService = logService;
    this.httpClient = httpClient;
  }

  fetchCharacters() {
    this.httpClient.get<StarWarsApi>("https://swapi.dev/api/people")
      .subscribe(
        (data) => {
          this.characters = data.results;
          this.charactersChanged.next();
        }
      );

  }

  getCharacters(chosenList) {
    if(!this.characters || !this.characters.length)
      return;

    if(chosenList === 'all')
      return this.characters.slice();

    return this.characters.filter((char) => {
          return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
  }

  characterExists(name) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    return pos !== -1;
  }

  addCharacter(name, side) {
    if(!this.characterExists(name)) {
      let newChar = new StarWarsCharacter(name, side);
      this.characters.push(newChar);
    }
  }

}
