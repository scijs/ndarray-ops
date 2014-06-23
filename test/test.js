var ops = require("../ndarray-ops.js")
  , ndarray = require("ndarray")
  , tape = require("tape")

tape("ndarray-ops", function(t) {

  var x = ndarray(new Float64Array(10))
  var y = ndarray(new Float64Array(10))

  t.assert(ops.equals(x, y))
  y.set(2, 1)
  t.assert(!ops.equals(x, y))

  ops.assigns(y, 5)
  for(var i=0; i<10; ++i) {
    t.equals(y.get(i), 5)
  }
  ops.add(x, y, y)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 10)
  }
  ops.addeq(x, y)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 15)
  }
  ops.adds(x, y, 1)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 6)
  }
  ops.addseq(x, 2)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 8)
  }

  ops.recip(x, y)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 0.2)
  }
  ops.negeq(x)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), -0.2)
  }

  var z = ndarray(new Uint8Array(10))
  ops.lt(z, x, y)
  for(var i=0; i<10; ++i) {
    t.assert(z.get(i))
  }

  ops.assigns(x, 4.0)
  ops.sqrteq(x)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 2)
  }

  ops.powops(x, y, 2)
  for(var i=0; i<10; ++i) {
    t.equals(x.get(i), 32)
  }

  t.assert(ops.any(z))
  t.assert(ops.all(z))
  t.equals(ops.sum(y), 50)
  t.equals(ops.prod(y), Math.pow(5, 10))
  t.equals(ops.norm2squared(y), 250)
  t.equals(ops.norm2(y), Math.sqrt(250))
  t.equals(ops.norminf(y), 5)
  t.equals(ops.norm1(y), 50)
  t.equals(ops.sup(y), 5)
  t.equals(ops.inf(y), 5)

  y.set(0, 10)
  y.set(1, -10)
  t.same(ops.argmax(y), [0])
  t.same(ops.argmin(y), [1])

  var q = ndarray(new Float64Array(2))
  var w = ndarray(new Uint8Array(2))
  t.same(ops.isnan(w,q).data, new Uint8Array([false, false]))
  q.set(0, q.get(0) / 0.0)
  t.same(ops.isnan(w,q).data, new Uint8Array([true, false]))

  var q = ndarray(new Float64Array(2))
  ops.isnaneq(q)
  t.same(q.data, new Float64Array([false, false]))

  var q = ndarray(new Float64Array(2))
  q.set(0, q.get(0) / 0.0)
  ops.isnaneq(q)
  t.same(q.data, new Float64Array([true, false]))

  t.end()
})
