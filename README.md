# `JSON`

By NriotHrreion

> 该仓库还未完工...

## 使用

和原生javascript的`JSON`一致

```js
const JSON = require("../JSON");

console.log(JSON.parse(`{
    "abcd": "efgh",
    "number": 1234,
    "bool": true,
    "asdfasdfadsf": null
}`));

console.log(JSON.stringify({a: 1, abcd: "efgh", num: 4, b: false, n: null}));
```
