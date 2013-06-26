"use strict"

var cwise = require("cwise")
var ndarray = require("ndarray")

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

function makeOp(user_args) {
  var args = []
  for(var i=0; i<user_args.args.length; ++i) {
    args.push("a"+i)
  }
  var wrapper = new Function("proc", [
    "return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {",
      "proc(", args.join(","), ");",
      "return a0;",
    "}"
  ].join(""))
  return wrapper(cwise(user_args))
}

(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: Function("a","b","c","a=b"+op+"c"),
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array","array"],
      body: Function("a","b","a"+op+"=b"),
      funcName: id+"eq"
    })
    exports[id+"s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: Function("a","b","s","a=b"+op+"s"),
      funcName: id+"s"
    })
    exports[id+"seq"] = makeOp({
      args: ["array","scalar"],
      body: Function("a","s","a"+op+"=s"),
      funcName: id+"seq"
    })
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
    exports[id] = makeOp({
      args: ["array", "array"],
      body: Function("a","b","a="+op+"b"),
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array"],
      body: Function("a","a="+op+"a"),
      funcName: id+"eq"
    })
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
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: Function("a", "b", "c", "a=b"+op+"c"),
      funcName: id
    })
    exports[id+"s"] = makeOp({
      args: ["array","array","scalar"],
      body: Function("a", "b", "s", "a=b"+op+"s"),
      funcName: id+"s"
    })
    exports[id+"eq"] = makeOp({
      args: ["array", "array"],
      body: Function("a", "b", "a=a"+op+"b"),
      funcName: id+"eq"
    })
    exports[id+"seq"] = makeOp({
      args: ["array", "scalar"],
      body: Function("a", "s", "a=a"+op+"s"),
      funcName: id+"seq"
    })
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
    exports[f] = makeOp({
                    args: ["array", "array"],
                    pre: Function("this.func=Math."+f),
                    body: function(a,b) {
                      a = this.func(b)
                    },
                    funcName: f
                  })
    exports[f+"eq"] = makeOp({
                      args: ["array"],
                      pre: Function("this.func=Math."+f),
                      body: function(a) {
                        a = this.func(a)
                      },
                      funcName: f+"eq"
                    })
  }
})()

var math_comm = [
  "max",
  "min"
];
(function(){
  for(var i=0; i<math_comm.length; ++i) {
    var f= math_comm[i]
 
    exports[f] = makeOp({
                  args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  },
                  funcName: f
                })
    exports[f+"s"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  },
                  funcName: f+"s"
                  })
    exports[f+"eq"] = makeOp({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  },
                  funcName: f+"eq"
                  })
 
    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  },
                  funcName: f+"seq"
                  })
  }
})()

var math_noncomm = [
  "atan2",
  "pow"
];

(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f] = makeOp({ args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }, funcName:f})
                  
    exports[f+"s"] = makeOp({ args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }, funcName:f+"s"})
                  
    exports[f+"eq"] = makeOp({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }, funcName:f+"eq"})
                  
    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }, funcName:f+"seq"})
                  
    exports[f+"op"] = makeOp({ args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(c,b)
                  }})
                  
    exports[f+"ops"] = makeOp({ args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(c,b)
                  }, funcName:f+"ops"})
                  
    exports[f+"opeq"] = makeOp({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(b,a)
                  }, funcName:f+"opeq"})
                  
    exports[f+"opseq"] = makeOp({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(b,a)
                  }, funcName:f+"opseq"})
                  
  }
})()

exports.any = cwise({ args:["array"],
  body: function any(a) {
    if(a) {
      return true
    }
  },
  post: function() {
    return false
  }})
  

exports.all = cwise({ args:["array"],
  body: function all(a) {
    if(!a) {
      return false
    }
  },
  post: function() {
    return true
  }})
  

exports.sum = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function sum(a) {
    this.sum += a
  },
  post: function() {
    return this.sum
  }})
  

exports.prod = cwise({ args:["array"],
  pre: function() {
    this.prod = 1
  },
  body: function prod(a) {
    this.prod *= a
  },
  post: function() {
    return this.prod
  }})
  

exports.norm2squared = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function norm2(a) {
    this.sum += a*a
  },
  post: function() {
    return this.sum
  }})
  


exports.norm2 = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function norm2(a) {
    this.sum += a*a
  },
  post: function() {
    return Math.sqrt(this.sum)
  }})
  

exports.norminf = cwise({ args:["array"],
  pre: function() {
    this.n = 0
  },
  body: function norminf(a) {
    if(a<0){
      if(-a<this.n){
        this.n=-a
      }
    } else if(a>this.n){
      s=a
    }
  },
  post: function() {
    return this.n
  }})
  

exports.norm1 = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function norm1(a) {
    this.sum += a < 0 ? -a : a
  },
  post: function() {
    return this.sum
  }})


exports.sup = cwise({ args:["array"],
  pre: function() {
    this.hi = Number.NEGATIVE_INFINITY
  },
  body: function sup(a) {
    if(a > this.hi) {
      this.hi = a
    }
  },
  post: function() {
    return this.hi
  }})
  

exports.inf = cwise({ args:["array"],
  pre: function() {
    this.lo = Number.POSITIVE_INFINITY
  },
  body: function inf(a) {
    if(a < this.lo) {
      this.lo = a
    }
  },
  post: function() {
    return this.lo
  }})

exports.argmin = cwise({ args:["index", "array", "shape"],
  pre: function(i,a,s) {
    this.min_v = Infinity
    this.min_i = s.slice(0)
  },
  body: function argmin(i, a) {
    if(a < this.min_v) {
      this.min_v = a
      for(var k=0; k<i.length; ++k) {
        this.min_i[k] = i[k]
      }
    }
  },
  post: function() {
    return this.min_i
  }})
  

exports.argmax = cwise({ args:["index", "array", "shape"],
  pre: function(i,a,s) {
    this.max_v = -Infinity
    this.max_i = s.slice(0)
  },
  body: function argmax(i, a) {
    if(a > this.max_v) {
      this.max_v = a
      for(var k=0; k<i.length; ++k) {
        this.max_i[k] = i[k]
      }
    }
  },
  post: function() {
    return this.max_i
  }})
  

exports.random = cwise({ args:["array"],
  pre: function() {
    this.rnd = Math.random
  },
  body: function random(a) {
    a = this.rnd()
  }})
  

exports.assign = makeOp({ args:["array", "array"],
  body: function assign(a,b) {
    a = b
  }})

exports.assigns = makeOp({ args:["array", "scalar"],
  body: function assigns(a,b) {
    a = b
  }})

exports.clone = function clone(array) {
  var stride = new Array(array.shape.length)
  var tsz = 1;
  for(var i=array.shape.length-1; i>=0; --i) {
    stride[i] = tsz
    tsz *= array.shape[i]
  }
  var ndata = new array.data.constructor(tsz)
  var result = ndarray(ndata, array.shape.slice(0), stride, 0)
  return exports.assign(result, array)
}
