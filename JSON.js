/** @enum {string} */
const Type = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean",
    NULL: "null",
    NONE: "none",
    OBJECT: "object",
    ARRAY: "array"
};

class JSON {
    /**
     * Parse a string to an object
     * @param {string} str
     * @return {object}
     */
    static parse(str) {
        var layer = 0;
        var inValue = Type.NONE;
        var inPair = false;
        var result = Object.create({});

        var tempTag = "";
        var tempTagStart = false;
        var tempValue = {
            type: Type.NONE,
            value: ""
        };
        var tempValueStart = false;

        // functions

        /**
         * 
         * @param {string} str 
         * @param {Type} type 
         * @return {any}
         */
        const strToType = (str, type) => {
            switch(type) {
                case Type.STRING:
                    return str;
                case Type.NUMBER:
                    return parseFloat(str);
                case Type.BOOLEAN:
                    return str === "true" ? true : false;
                case Type.NULL:
                    return null;
                case Type.NONE:
                    return undefined;
                // case Type.OBJECT:
                // case Type.ARRAY:
                //     return this.parse(str);
            }
        }

        function resetVars() {
            tempTag = "";
            tempTagStart = false;
            tempValue.type = Type.NONE;
            tempValue.value = "";
            tempValueStart = false;
        }

        // main

        str = str.replaceAll(" ", "");
        str = str.replaceAll("\n", "");

        for(let i = 0; i < str.length; i++) {
            // var k = str[i]; // debug
            switch(str.charCodeAt(i)) {
                case 123: // {
                case 91: // [
                    layer++;
                    if(inPair) {
                        // `c` => character
                        // `tl` => temp layer
                        var j = 0, c, tl;
                        for(j; j < str.length && c != "}" && layer != tl; j++) {
                            c = str[j];
                            if(c == "{") tl++;
                            if(c == "}") tl--;
                        }
                        
                        var objStr = str.substring(i, j);
                        result[tempTag] = this.parse(objStr);
                        resetVars();
                        inPair = false;
                        
                        i = j;
                    }
                    break;
                case 125: // }
                case 93: // ]
                    layer--;
                    break;
                case 34: // "
                case 39: // '
                    if(inPair) {
                        tempValueStart = tempValueStart ? false : true;
                        if(tempValueStart) inValue = Type.STRING;
                        if(!tempValueStart) {
                            inPair = false;
                            result[tempTag] = strToType(tempValue.value, tempValue.type);
                            resetVars();
                        }
                    } else {
                        tempTagStart = tempTagStart ? false : true;
                    }
                    break;
                case 58: // :
                    inPair = true;
                    break;
                case 48: // 0
                case 49: // 1
                case 50: // 2
                case 51: // 3
                case 52: // 4
                case 53: // 5
                case 54: // 6
                case 55: // 7
                case 56: // 8
                case 57: // 9
                    if(inValue === Type.STRING && tempValueStart) {
                        tempValue.type = inValue;
                        tempValue.value += str[i];
                        break;
                    }
                    if(!tempValueStart) tempValueStart = true;
                    inValue = Type.NUMBER;
                    tempValue.type = inValue;
                    tempValue.value += str[i];

                    if(str[i + 1].charCodeAt() === 44 /* , */ || str[i + 1].charCodeAt() === 125 /* } */) {
                        tempValueStart = false;
                        inPair = false;
                        result[tempTag] = strToType(tempValue.value, tempValue.type);
                        resetVars();
                    }
                    break;
                default: // character
                    var char = str[i];

                    if(tempTagStart) {
                        tempTag += char;
                        break;
                    }
                    
                    if(tempValueStart) {
                        tempValue.type = inValue;
                        tempValue.value += char;
                    } else {
                        if(
                            str[i] === "t" &&
                            str[i + 1] === "r" &&
                            str[i + 2] === "u" &&
                            str[i + 3] === "e"
                        ) { // true
                            result[tempTag] = true;
                            resetVars();
                            inPair = false;
                            i += 4;
                        } else if(
                            str[i] === "f" &&
                            str[i + 1] === "a" &&
                            str[i + 2] === "l" &&
                            str[i + 3] === "s" &&
                            str[i + 4] === "e"
                        ) { // false
                            result[tempTag] = false;
                            resetVars();
                            inPair = false;
                            i += 5;
                        } else if(
                            str[i] === "n" &&
                            str[i + 1] === "u" &&
                            str[i + 2] === "l" &&
                            str[i + 3] === "l"
                        ) { // null
                            result[tempTag] = null;
                            resetVars();
                            inPair = false;
                            i += 4;
                        }
                    }
                    break;
            }
        }

        return result;
    }

    /**
     * Parse an object to a string
     * @param {object} obj 
     */
    static stringify(obj) {

    }
}

try {
    if(window) window.JSON = JSON;
} catch {
    if(require) module.exports = JSON;
}
