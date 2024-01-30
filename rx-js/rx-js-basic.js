import { fromEvent, interval, Observable, of, Subject, timer } from "rxjs";
import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  takeWhile,
  tap,
} from "rxjs/operators";

const subject = new Subject();
subject.subscribe((value) => console.log("sub 1", value));
subject.subscribe((value) => console.log("sub 2", value));

const obs = of(21, 22, 23);
obs.subscribe(subject);

const obsEx = new Observable((sub) => {
  sub.next(2);
  sub.next(20);
});

obsEx.subscribe((d) => console.log(d, "from the oberserv1 "));
obsEx.subscribe((d) => console.log(d, "from the oberserv2 "));

const observavable = interval(1000);

// Buffer: The streamed data will buffered till the given action
const buttonObs$ = fromEvent(document.getElementById("showButton"), "click");

observavable.pipe(buffer(buttonObs$)).subscribe((data) => console.log(data));

//Buffer Count: the data vwill be streamed after the count exeedes
timer(1000, 1000)
  .pipe(bufferCount(3, 2))
  .subscribe((data) => console.log(data));

//Buffer Time example:- count of click for a given time
fromEvent(document.getElementById("showButton"), "click")
  .pipe(bufferTime(10000))
  .subscribe((data) => console.log('The clicks count for 10 sec"s are', data));

//BufferToggel:- custume the open and close of the buffer

const openBuffer = interval(3000).pipe(
  tap(() => console.log("Opening the buffer"))
);
function closeBuffer() {
  return interval(6000).pipe(tap(() => console.log("close the buffer")));
}

interval(1000)
  .pipe(
    tap((data) => console.log("My bugger togger tap value", data)),
    bufferToggle(openBuffer, closeBuffer)
  )
  .subscribe((data) => console.log("My Buffer toggel data", data));
