import {
  of,
  fromEvent,
  from,
  timer,
  interval,
  range,
  combineLatest,
  merge,
  zip,
  forkJoin,
  Observable,
} from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map, throttleTime, take, concatMap } from "rxjs/operators";

const obs = new Observable((sub) => {
  sub.next(1);
  sub.next(2);
  setTimeout(() => {
    sub.next(21), sub.complete();
  }, 5000);
});

obs.subscribe((next) => console.log(next + " from observable"));

console.log("--------Creational operator---------");
of(1, 2, 4).subscribe(
  (data) => console.log("The Of values are", data),
  (error) => console.log(error),
  () => console.log("completed")
);
// observable for the array and iterables
from([1, 2, 4, 6]).subscribe(console.log);

// timer with intial dealy and then sequence interval
let timerObs = timer(1000, 1000);
timerObs.pipe(take(2)).subscribe((n) => console.log("timer", n));
// interval with the time
let intervalObs = interval(1000);
let interSubscription = intervalObs
  .pipe(take(2))
  .subscribe((n) => console.log("My interval", n));
interSubscription.unsubscribe();

// range
range(0, 5).subscribe((data) => console.log("The Range Data is", data));
// promise
const promise = new Promise((resolve, reject) => {
  if (10 % 2 == 0) return resolve(true);
  return reject(false);
});
let promiseObs = fromPromise(promise);
promiseObs.subscribe((data) => console.log("from the promise", data));

const button = document.getElementById("myButton");
const observable = fromEvent(button, "click");
//subscriber
observable.pipe(take(2)).subscribe(
  (data) => console.log(data),
  (err) => console.log(err),
  () => console.log("completed")
);

console.log("-------Joining operator---------");
combineLatest(observable, promiseObs).subscribe((data) =>
  console.log("combine latest", data)
);

merge(observable, promiseObs).subscribe((data) =>
  console.log("merged observble", data)
);

forkJoin(intervalObs, timerObs).subscribe(([value]) =>
  console.log("fork join data", value)
);
