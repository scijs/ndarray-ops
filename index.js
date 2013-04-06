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

(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = cwise({
      args: ["array","array","array"],
      body: Function("a","b","c","a=b"+op+"c")
    })
    exports[id+"eq"] = cwise({
      args: ["array","array"],
      body: Function("a","b","a"+op+"=b")
    })
    exports[id+"s"] = cwise({
      args: ["array", "array", "scalar"],
      body: Function("a","b","s","a=b"+op+"s")
    })
    exports[id+"seq"] = cwise({
      args: ["array","scalar"],
      body: Function("a","s","a"+op+"=s")
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
    exports[id] = cwise({
      args: ["array", "array"],
      body: Function("a","b","a="+op+"b")
    })
    exports[id+"eq"] = cwise({
      args: ["array"],
      body: Function("a","a="+op+"a")
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
    exports[id] = cwise({
      args: ["array","array","array"],
      body: Function("a", "b", "c", "a=b"+op+"c")
    })
    exports[id+"s"] = cwise({
      args: ["array","array","scalar"],
      body: Function("a", "b", "s", "a=b"+op+"s")
    })
    exports[id+"eq"] = cwise({
      args: ["array", "array"],
      body: Function("a", "b", "a=a"+op+"b")
    })
    exports[id+"seq"] = cwise({
      args: ["array", "scalar"],
      body: Function("a", "s", "a=a"+op+"s")
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
    exports[f] = cwise({
                    args: ["array", "array"],
                    pre: Function("this.func=Math."+f),
                    body: function(a,b) {
                      a = this.func(b)
                    }
                  })
    exports[f+"eq"] = cwise({
                      args: ["array"],
                      pre: Function("this.func=Math."+f),
                      body: function(a) {
                        a = this.func(a)
                      }
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
 
    exports[f] = cwise({
                  args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }
                })
    exports[f+"s"] = cwise({
                  args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }})
    exports[f+"eq"] = cwise({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }})
 
    exports[f+"seq"] = cwise({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }})
  }
})()

var math_noncomm = [
  "atan2",
  "pow"
];

(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f] = cwise({ args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }})
                  
    exports[f+"s"] = cwise({ args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(b,c)
                  }})
                  
    exports[f+"eq"] = cwise({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }})
                  
    exports[f+"seq"] = cwise({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(a,b)
                  }})
                  
    exports[f+"op"] = cwise({ args:["array", "array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(c,b)
                  }})
                  
    exports[f+"ops"] = cwise({ args:["array", "array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b,c) {
                    a = this.func(c,b)
                  }})
                  
    exports[f+"opeq"] = cwise({ args:["array", "array"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(b,a)
                  }})
                  
    exports[f+"opseq"] = cwise({ args:["array", "scalar"],
                  pre: Function("this.func=Math."+f),
                  body: function(a,b) {
                    a = this.func(b,a)
                  }})
                  
  }
})()

exports.any = cwise({ args:["array"],
  body: function(a) {
    if(a) {
      return true
    }
  },
  post: function() {
    return false
  }})
  

exports.all = cwise({ args:["array"],
  body: function(a) {
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
  body: function(a) {
    this.sum += a
  },
  post: function() {
    return this.sum
  }})
  

exports.prod = cwise({ args:["array"],
  pre: function() {
    this.prod = 1
  },
  body: function(a) {
    this.prod *= a
  },
  post: function() {
    return this.prod
  }})
  

exports.norm2squared = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function(a) {
    this.sum += a*a
  },
  post: function() {
    return this.sum
  }})
  


exports.norm2 = cwise({ args:["array"],
  pre: function() {
    this.sum = 0
  },
  body: function(a) {
    this.sum += a*a
  },
  post: function() {
    return Math.sqrt(this.sum)
  }})
  

exports.norminf = cwise({ args:["array"],
  pre: function() {
    this.n = 0
  },
  body: function(a) {
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
  body: function(a) {
    this.sum += a < 0 ? -a : a
  },
  post: function() {
    return this.sum
  }})


exports.sup = cwise({ args:["array"],
  pre: function() {
    this.hi = Number.NEGATIVE_INFINITY
  },
  body: function(a) {
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
  body: function(a) {
    if(a < this.lo) {
      this.lo = a
    }
  },
  post: function() {
    return this.lo
  }})
  

exports.argmin = cwise({ args:["index", "array"],
  pre: function(i) {
    this.min_v = Number.POSITIVE_INFINITY
    this.min_i = i.slice(0)
  },
  body: function(i, a) {
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
  

exports.argmax = cwise({ args:["index", "array"],
  pre: function(i) {
    this.max_v = Number.NEGATIVE_INFINITY
    this.max_i = i.slice(0)
  },
  body: function(i, a) {
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
  body: function(a) {
    a = this.rnd()
  }})
  

exports.assign = cwise({ args:["array", "array"],
  body: function(a,b) {
    a = b
  }})

exports.assigns = cwise({ args:["array", "scalar"],
  body: function(a,b) {
    a = b
  }})

exports.clone = function(array) {
  var stride = new Array(array.shape.length)
  var tsz = 1;
  for(var i=array.shape.length-1; i>=0; --i) {
    stride[i] = tsz
    tsz *= array.shape[i]
  }
  var ndata = new array.data.constructor(array.data.slice(0, tsz*array.data.BYTES_PER_ELEMENT))
  var result = ndarray(ndata, array.shape.slice(0), stride, 0)
  return exports.assign(result, array)
}
