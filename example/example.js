//First, import libraries
var ndarray = require("ndarray")
  , ops = require("../index.js")


//Next, create some arrays
var a = ndarray.zeros([128,128])
  , b = ndarray.zeros([128,128])
  , c = ndarray.zeros([128,128])

//Initialize b with some random numbers:
ops.random(b)

//Set c to a constant 1
ops.assigns(c, 1.0)

//Add b and c, store result in a:
ops.add(a, b, c)

//Multiply a by 0.5 in place
ops.mulseq(a, 0.5)

//Print some statistics about a:
console.log(
  "inf(a) = ", ops.inf(a),
  "sup(a) = ", ops.sup(a),
  "argmin(a) = ", ops.argmin(a),
  "argmax(a) = ", ops.argmax(a),
  "norm1(a) = ", ops.norm1(a))
