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
    exports[id] = cwise(Function("a","b","c","a=b"+op+"c"))
    exports[id+"eq"] = cwise(Function("a","b","a"+op+"=b"))
    exports[id+"s"] = cwise(Function("a","b","s","a=b"+op+"s"), {scalars:[2]})
    exports[id+"seq"] = cwise(Function("a","s","a"+op+"=s"), {scalars:[1]})
  }
})()

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
};

(function(){
  for(var id in unary_ops) {
    var op = unary_ops[id]
    exports[id] = cwise(Function("a","b","a="+op+"b"))
    exports[id+"eq"] = cwise(Function("a","a="+op+"a"))
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
    exports[id] = cwise(Function("a", "b", "c", "a=b"+op+"c"))
    exports[id+"s"] = cwise(Function("a", "b", "s", "a=b"+op+"s"), {scalars:[2]})
    exports[id+"eq"] = cwise(Function("a", "b", "a=a"+op+"b"))
    exports[id+"seq"] = cwise(Function("a", "s", "a=a"+op+"s"), {scalars:[1]})
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
    exports[f] = cwise(Function("a", "b", "a=func(b)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"eq"] = cwise(Function("a", "a=func(a)"), {
      pre: Function("var func=Math."+f)
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
    exports[f] = cwise(Function("a", "b", "c", "a=func(b,c)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"s"] = cwise(Function("a", "b", "c", "a=func(b,c)"), {
      pre: Function("var func=Math."+f),
      scalars:[2]
    })
    exports[f+"eq"] = cwise(Function("a", "b", "a=func(a,b)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"seq"] = cwise(Function("a", "b", "a=func(a,b)"), {
      pre: Function("var func=Math."+f),
      scalars: [1]
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
    exports[f] = cwise(Function("a", "b", "c", "a=func(b,c)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"s"] = cwise(Function("a", "b", "c", "a=func(b,c)"), {
      pre: Function("var func=Math."+f),
      scalars:[1]
    })
    exports[f+"sop"] = cwise(Function("a", "b", "c", "a=func(b,c)"), {
      pre: Function("var func=Math."+f),
      scalars:[2]
    })
    exports[f+"eq"] = cwise(Function("a", "b", "a=func(a,b)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"seq"] = cwise(Function("a", "b", "a=func(a,b)"), {
      pre: Function("var func=Math."+f),
      scalars: [1]
    })
    exports[f+"opeq"] = cwise(Function("a", "b", "a=func(b,a)"), {
      pre: Function("var func=Math."+f)
    })
    exports[f+"sopeq"] = cwise(Function("a", "b", "a=func(b,a)"), {
      pre: Function("var func=Math."+f),
      scalars: [1]
    })
  }
})()

exports.any = cwise(function(a) { if(a) return true }, {
  post: function() { return false }
})

exports.all = cwise(function(a) { if(!a) return false }, {
  post: function() { return true }
})

exports.sum = cwise(Function("a", "s+=a"), {
  pre: Function("var s=0"),
  post: Function("return s")
})

exports.prod = cwise(Function("a", "s*=a"), {
  pre: Function("var s=1"),
  post: Function("return s")
})

exports.norm2squared = cwise(Function("a", "s+=a*a"), {
  pre: Function("var s=0"),
  post: Function("return s")
})

exports.norm2 = function(a) {
  return Math.sqrt(exports.norm2squared(a))
}

exports.norminf = cwise(Function("a", "if(a<0){if(-a<s){s=-a}}else{if(a>s){s=a}}"), {
  pre: Function("var s=0"),
  post: Function("return s")
})

exports.norm1 = cwise(Function("a", "if(a<0){s-=a}else{s+=a}"), {
  pre: Function("var s=0"),
  post: Function("return s")
})

exports.sup = cwise(Function("a", "if(a>s)s=a"), {
  pre: Function("var s=Number.NEGATIVE_INFINITY"),
  post: Function("return s")
})

exports.inf = cwise(Function("a", "if(a<s)s=a"), {
  pre: Function("var s=Number.POSITIVE_INFINITY"),
  post: Function("return s")
})

exports.argmin = cwise(Function("a", "i", "if(a<s){s=a;for(var k=0;k<i.length;++k){j[k]=i[k];}}"), {
  index: 1,
  pre: Function("a", "i", "var s=Number.NEGATIVE_INFINITY,j=i.slice(0)"),
  post: Function("return j")
})

exports.argmax = cwise(Function("a", "i", "if(a>s){s=a;for(var k=0;k<i.length;++k){j[k]=i[k];}}"), {
  index: 1,
  pre: Function("a", "i", "var s=Number.NEGATIVE_INFINITY,j=i.slice(0)"),
  post: Function("return j")
})

exports.random = cwise(Function("a", "a=func()"), {
  pre: Function("var func=Math.random")
})

exports.assign = cwise(function(a,b) {a=b})
exports.assigns = cwise(function(a,b) {a=b}, {scalars:[1]})
