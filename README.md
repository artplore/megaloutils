# Megaloutils

Utility functions that I frequently used.

## Quick examples

### Array

#### Array Toggle

```javascript
const arr = ['1', '2', '3']

toggleArray('2') // arr -> ['1','3']
toggleArray('4') // arr -> ['1','3','4']
```

#### Find one in object array with specific field value

```javascript
const arr = [
	{ label: '1', value: '1' },
	{ label: '2', value: '2' },
	{ label: '3', value: '3' },
]

findInArray(arr, 'value', '2') 
// returns -> {label:'2', value:'2'}
```

and much more...

The function names are self explanatory.
