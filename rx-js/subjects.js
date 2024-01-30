import {
  AsyncSubject,
  BehaviorSubject,
  of,
  ReplaySubject,
  Subject,
} from "rxjs";

// SUBJECT
const sub = new Subject();
sub.next(1);
sub.next(5);
sub.subscribe((data) => console.log("SUB 1=> ", data));
sub.subscribe((data) => console.log("SUB 2=> ", data));
sub.next(19);
sub.next(20);

//BEHAVIROL SUBJECT=> Subject with the intial behavior
const behSub = new BehaviorSubject(2);
behSub.subscribe((data) => console.log("Behavirol sub 1=> ", data));
behSub.next(3);
behSub.subscribe((data) => console.log("Behavirol sub 2=> ", data));

//REPLAY SUBJECT=> Subject which emits the older data to the subcription
const repSub = new ReplaySubject(2);
repSub.next(33);
repSub.next(49);
repSub.subscribe((data) => console.log("Replay Sub 1=> ", data));
repSub.next(74);
repSub.subscribe((data) => console.log("Replay Sub 2=> ", data));

//ASYNC SUBJECT
const asySub = new AsyncSubject();
asySub.next(33);
asySub.next(49);
asySub.subscribe((data) => console.log("Async Sub 1=> ", data));
asySub.next(74);
asySub.subscribe((data) => console.log("Async Sub 2=> ", data));
asySub.complete();
