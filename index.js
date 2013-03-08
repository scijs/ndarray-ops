var cwise = require("cwise");

var assign_ops = {
  add:  "+",
  sub:  "-",
  mul:  "*",
  div:  "/",
  mod:  "%",
  band: "&",
  bor:  "|",
  bxor: "^",
  lshift: "<<",
  rshift: ">>",
  rrshift: ">>>"
};

(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = cwise("array","array","array").body(Function("a","b","c","a=b"+op+"c")).compile()
    exports[id+"eq"] = cwise("array","array").body(Function("a","b","a"+op+"=b")).compile()
    exports[id+"s"] = cwise("array", "scalar").body(Function("a","b","s","a=b"+op+"s")).compile()
    exports[id+"seq"] = cwise("array","scalar").body(Function("a","s","a"+op+"=s")).compile()
  }
})()

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
  recip: "1.0/"
};

(function(){
  for(var id in unary_ops) {
    var op = unary_ops[id]
    exports[id] = cwise("array", "array").body(Function("a","b","a="+op+"b")).compile()
    exports[id+"eq"] = cwise("array").body(Function("a","a="+op+"a")).compile()
  }
})()

var binary_ops = {
  and: "&&",
  or: "||",
  eq: "===",
  neq: "!==",
  lt: "<",
  gt: ">",
  leq: "<=",
  geq: ">="
};

(function() {
  for(var id in binary_ops) {
    var op = binary_ops[id]
    exports[id] = cwise("array","array","array").body(Function("a", "b", "c", "a=b"+op+"c")).compile()
    exports[id+"s"] = cwise("array","array","scalar").body(Function("a", "b", "s", "a=b"+op+"s")).compile()
    exports[id+"eq"] = cwise("array", "array").body(Function("a", "b", "a=a"+op+"b")).compile()
    exports[id+"seq"] = cwise("array", "scalar").body(Function("a", "s", "a=a"+op+"s")).compile()
  }
})()

var math_unary = [
  "abs",
  "acos",
  "asin",
  "atan",
  "ceil",
  "cos",
  "exp",
  "floor",
  "log",
  "round",
  "sin",
  "sqrt",
  "tan"
];

(function() {
  for(var i=0; i<math_unary.length; ++i) {
    var f = math_unary[i]
    exports[f] = cwise("array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(b)
                  })
                  .compile()
    exports[f+"eq"] = cwise("array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a) {
                    a = this.func(a)
                  })
                  .compile()
  }
})()

var math_comm = [
  "max",
  "min"
];
(function(){
  for(var i=0; i<math_comm.length; ++i) {
    var f= math_comm[i]
 
    exports[f] = cwise("array", "array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(b,c)
                  })
                  .compile()
    exports[f+"s"] = cwise("array", "array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(b,c)
                  })
                  .compile()
    exports[f+"eq"] = cwise("array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(a,b)
                  })
                  .compile()
    exports[f+"seq"] = cwise("array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(a,b)
                  })
                  .compile()
  }
})()

var math_noncomm = [
  "atan2",
  "pow"
];

(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f] = cwise("array", "array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(b,c)
                  })
                  .compile()
    exports[f+"s"] = cwise("array", "array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(b,c)
                  })
                  .compile()
    exports[f+"eq"] = cwise("array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(a,b)
                  })
                  .compile()
    exports[f+"seq"] = cwise("array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(a,b)
                  })
                  .compile()
    exports[f+"op"] = cwise("array", "array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(c,b)
                  })
                  .compile()
    exports[f+"ops"] = cwise("array", "array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b,c) {
                    a = this.func(c,b)
                  })
                  .compile()
    exports[f+"opeq"] = cwise("array", "array")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(b,a)
                  })
                  .compile()
    exports[f+"opseq"] = cwise("array", "scalar")
                  .begin(Function("this.func=Math."+f))
                  .body(function(a,b) {
                    a = this.func(b,a)
                  })
                  .compile()
  }
})()

exports.any = cwise("array")
  .body(function(a) {
    if(a) {
      return true
    }
  })
  .end(function() {
    return false
  })
  .compile()

exports.all = cwise("array")
  .body(function(a) {
    if(!a) {
      return false
    }
  })
  .end(function() {
    return true
  })
  .compile()

exports.sum = cwise("array")
  .begin(function() {
    this.sum = 0
  })
  .body(function(a) {
    this.sum += a
  })
  .end(function() {
    return this.sum
  })
  .compile()

exports.prod = cwise("array")
  .begin(function() {
    this.prod = 1
  })
  .body(function(a) {
    this.prod *= a
  })
  .end(function() {
    return this.prod
  })
  .compile()

exports.norm2squared = cwise("array")
  .begin(function() {
    this.sum = 0
  })
  .body(function(a) {
    this.sum += a*a
  })
  .end(function() {
    return this.sum
  })
  .compile()


exports.norm2 = cwise("array")
  .begin(function() {
    this.sum = 0
  })
  .body(function(a) {
    this.sum += a*a
  })
  .end(function() {
    return Math.sqrt(this.sum)
  })
  .compile()

exports.norminf = cwise("array")
  .begin(function() {
    this.n = 0
  })
  .body(function(a) {
    if(a<0){
      if(-a<this.n){
        this.n=-a
      }
    } else if(a>this.n){
      s=a
    }
  })
  .end(function() {
    return this.n
  })
  .compile()

exports.norm1 = cwise("array")
  .begin(function() {
    this.sum = 0
  })
  .body(function(a) {
    this.sum += a < 0 ? -a : a
  })
  .end(function() {
    return this.sum
  })
  .compile()


exports.sup = cwise("array")
  .begin(function() {
    this.hi = Number.NEGATIVE_INFINITY
  })
  .body(function(a) {
    if(a > this.hi) {
      this.hi = a
    }
  })
  .end(function() {
    return this.hi
  })
  .compile()

exports.inf = cwise("array")
  .begin(function() {
    this.lo = Number.POSITIVE_INFINITY
  })
  .body(function(a) {
    if(a < this.lo) {
      this.lo = a
    }
  })
  .end(function() {
    return this.lo
  })
  .compile()

exports.argmin = cwise("index", "array")
  .begin(function(i) {
    this.min_v = Number.POSITIVE_INFINITY
    this.min_i = i.slice(0)
  })
  .body(function(i, a) {
    if(a < this.min_v) {
      this.min_v = a
      for(var k=0; k<i.length; ++k) {
        this.min_i[k] = i[k]
      }
    }
  })
  .end(function() {
    return this.min_i
  })
  .compile()

exports.argmax = cwise("index", "array")
  .begin(function(i) {
    this.max_v = Number.NEGATIVE_INFINITY
    this.max_i = i.slice(0)
  })
  .body(function(i, a) {
    if(a > this.max_v) {
      this.max_v = a
      for(var k=0; k<i.length; ++k) {
        this.max_i[k] = i[k]
      }
    }
  })
  .end(function() {
    return this.max_i
  })
  .compile()

exports.random = cwise("array")
  .begin(function() {
    this.rnd = Math.random
  })
  .body(function(a) {
    a = this.rnd()
  })
  .compile()

exports.assign = cwise("array", "array")
  .body(function(a,b) {
    a = b
  })
  .compile()

exports.assigns = cwise("array", "scalar")
  .body(function(a,b) {
    a = b
  })
  .compile()
