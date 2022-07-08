const JSON = require("../JSON");

console.log(JSON.parse(`{
    "testobj": {
        "a": 1,
        "b": "2",
        "c": true,
        "d": {
            "e": false,
            "f": null
        }
    },
    "teststr": "Hello"
}`));
console.log(JSON.stringify({a: 1}));
