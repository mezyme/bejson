# bejson
Format and beautify json strings through pure js

## Usage

### Browser
```html
<script src="../src/bejson.js"></script>
...
<script>
    var old_json = '{"a":"a","b":[1,2],"c":{"c1":"cc","c2":123}}';
    var json = bejson(old_json, {debug:true});
    console.log(json);
</script>
```
----- output -----

```text

{
    "a": "a",
    "b": [
        1,
        2
    ],
    "c": {
        "c1": "cc",
        "c2": 123
    }
}
```
### Node

```nodejs
npm install bejson
```
