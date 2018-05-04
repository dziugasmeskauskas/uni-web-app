import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { IJoke } from '../interfaces/joke';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class JokeService {

  constructor(private httpClient: HttpClient) { }

  public getJokes(): Observable<IJoke[]> {
    return this.httpClient.get<IJoke[]>(`joke`);
  }

  public getJoke(id: number): Observable<IJoke> {
    return this.httpClient.get<IJoke>(`joke/${id}`);
  }

  public editJoke(id: number, joke): Observable<IJoke> {
    return this.httpClient.put<IJoke>(`joke/${id}`, joke);
  }

  public addJoke(joke): Observable<IJoke> {
    return this.httpClient.post<IJoke>(`joke`, joke);
  }

  public deleteJoke(id: number): Observable<IJoke> {
    return this.httpClient.delete<IJoke>(`joke/${id}`);
  }
}
