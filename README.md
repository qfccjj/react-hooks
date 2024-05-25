### immer

以一种更直观、更简洁的方式来更新不可变数据

```js
import produce from "immer";

const baseState = [
	{
		todo: "Learn typescript",
		done: true
	},
	{
		todo: "Try immer",
		done: false
	}
];

const nextState = produce(baseState, draftState => {
	draftState.push({ todo: "Tweet about it" });
	draftState[1].done = true;
});

console.log(nextState);
```
