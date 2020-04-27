# zebex-z3100

### Description

This package aims to make it simple to connect to the [zebex z3100 ccd scanner](https://www.zebex.com/en/product/index/10/Z-3100). This package uses serialport package to communicate between the node process and the ccd scanner.

### Usage

```js
const Zebex = require("zebex-z3100");

;(async () => {
    const scanner = new Zebex();

    await scanner.connect();

    scanner.on("data", data => {
        console.log(data.toString())

        scanner.disconnect();
    })
})()
```

#### Options

The Zebex class can take a single parameter as an object with the follwing properties.

- `baudRate: number` - If you can configured your scanner to use a different baudrate you can set it there.
- `parser:  stream.Transform` - A parser to modify the incoming buffer. Please refer to the [serialport documentation](https://serialport.io/docs/api-parsers-overview)


### Resources
- [Official zebex page with datasheets, programming guide etc...](https://www.zebex.com/en/product/index/10/Z-3100)
- [Serialport API documentation](https://serialport.io/docs/guide-usage)