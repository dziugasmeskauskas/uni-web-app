import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { IJoke } from '../shared/interfaces/joke';
import { Subject } from 'rxjs/Subject';
import { JokeService } from '../shared/services/joke.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<boolean> = new Subject();
  public joke: IJoke;
  public editJoke: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jokeService: JokeService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => this.onParamsChange(params));
  }

  private onParamsChange(params: Params) {
    if (params.id) {
      this.jokeService.getJoke(params.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((joke: IJoke) => this.joke = joke);
      return;
    }
    this.joke = {} as IJoke;
  }
  public submitForm(joke, event) {
    if (joke._id) {
      this.saveJoke(joke);
      return;
    }

    this.createJoke(joke);
  }

  public createJoke(joke) {
    this.jokeService.addJoke(joke)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => this.router.navigate(['jokes']));
  }

  public saveJoke(joke) {
    this.jokeService.editJoke(joke._id, { setup: joke.setup, punchline: joke.punchline })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => this.router.navigate(['jokes']))
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
