var ops = require("../ndarray-ops.js")
  , ndarray = require("ndarray")
  , tape = require("tape")

tape("clone", function(t) {

  var x = ndarray(new Int32Array(3))
  
  x.set(0, 1)
  x.set(1, 2)
  x.set(2, 3)
  
  var y = ops.clone(x)
  
  t.equals(y.get(0), 1)
  t.equals(y.get(1), 2)
  t.equals(y.get(2), 3)
  
  y.set(0, 1000)
  
  t.equals(x.get(0), 1)
  t.equals(x.get(1), 2)
  t.equals(x.get(2), 3)

  t.equals(y.get(0), 1000)
  t.equals(y.get(1), 2)
  t.equals(y.get(2), 3)
  
  t.end()
})