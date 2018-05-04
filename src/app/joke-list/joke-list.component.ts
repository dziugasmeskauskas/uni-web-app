import { IJoke } from './../shared/interfaces/joke';
import { JokeService } from './../shared/services/joke.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit, OnDestroy {

  public jokeList;
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(
    private jokeService: JokeService
  ) { }

  ngOnInit() {
    this.getJokes();
  }

  private getJokes() {
    this.jokeService.getJokes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(jokes => this.jokeList = jokes.map(joke => ({ _id: joke._id, type: joke.type, setup: joke.setup, punchline: joke.punchline, open: false })));
  }

  public deleteJoke(joke) {
    this.jokeService.deleteJoke(joke._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        const jokeIndex = this.jokeList.findIndex(item => item._id === joke._id);
        this.jokeList.splice(jokeIndex, 1);
      })
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
