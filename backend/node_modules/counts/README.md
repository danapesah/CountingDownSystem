# counts

Count sets of stuff! This is useful for reference counting sets of things for which you have an identifier.

## Install

```sh
npm install counts
```

## Usage

```js
var counts = new Counts()
counts.inc('foo')
counts.inc('foo', 2)
counts.get('foo') // returns 3
counts.dec('foo')
counts.dec('foo', 2)
counts.has('foo') // return false
```
