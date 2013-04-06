var ops = require("../index.js")
  , ndarray = require("ndarray")

require("tap").test("clone", function(t) {

  var x = ndarray.zeros([3])
  
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