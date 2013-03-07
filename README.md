ndarray-ops
===========
A collection of common mathematical operations for [ndarrays](http://github.com/mikolalysenko/ndarrays).  Implemented using [cwise](http://github.com/mikolalysenko/cwise)

Usage
=====
First, install the library using npm:

    npm install ndarray-ops
    
Then you can import the library by doing:

    var ops = require("ndarray-ops")

Then you can use the functions as in the following example:

```javascript
//First, import libraries
var ndarray = require("ndarray")
  , ops = require("ndarray-ops")


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
```

Conventions
===========
This library implements component-wise operations for all of the operators and Math.* functions in JS, along with a few commonly used aggregate operations.  Most of the functions in the library work by applying some commutative binary operator to a pair of arrays. You call them like this:

```javascript
ops.add(dest, arg1, arg2)
```

Which translates into code that works (approximately) like this:

```javascript
for(var i=0; i<dest.shape[0]; ++i) {
  dest[i] = arg1[i] + arg2[i]
}
```

It is up to you to specify where the result gets store.  This library does not create new arrays for you to avoid performing expensive intermediate allocations.  There are also a few other variations:

```javascript
ops.addeq(dest, arg1)
```
Operators with the -eq suffix perform an assignment.

```javascript
for(var i=0; i<dest.shape[0]; ++i) {
  dest[i] += arg1[i]
}
```

```javascript
ops.adds(dest, arg1, 1.0)
```
The -s suffix denotes scalar/broadcast operations; so the above would translate to:

```javascript
for(var i=0; i<dest.shape[0]; ++i) {
  dest[i] = arg1[i] + 1.0
}
```

```javascript
ops.addseq(dest, 1.0)
```
The -seq suffix is basically the combination of the above, and translates to:

```javascript
for(var i=0; i<dest.shape[0]; ++i) {
  dest[i] += 1.0
}
```

The following operators follow this rule:

* add
* addeq
* adds
* addseq
* sub
* subeq
* subs
* subseq
* mul
* muleq
* muls
* mulseq
* div
* diveq
* divs
* divseq
* mod
* modeq
* mods
* modseq
* band
* bandeq
* bands
* bandseq
* bor
* boreq
* bors
* borseq
* bxor
* bxoreq
* bxors
* bxorseq
* lshift
* lshifteq
* lshifts
* lshiftseq
* rshift
* rshifteq
* rshifts
* rshiftseq
* rrshift
* rrshifteq
* rrshifts
* rrshiftseq
* lt
* lts
* lteq
* ltseq
* gt
* gts
* gteq
* gtseq
* leq
* leqs
* leqeq
* leqseq
* geq
* geqs
* geqeq
* geqseq
* max
* maxs
* maxeq
* maxseq
* min
* mins
* mineq
* minseq
* and
* ands
* andeq
* andseq
* or
* ors
* oreq
* orseq
* eq
* eqs
* eqeq
* eqseq
* neq
* neqs
* neqeq
* neqseq


Special Cases
-------------
There are a few corner cases that follow slightly different rules.  These can be grouped using the following general categories:

### Assignment

* assign
* assigns

### Nullary operators

* random

### Unary operators

* not
* noteq
* bnot
* bnoteq
* neg
* negeq
* abs
* abseq
* acos
* acoseq
* asin
* asineq
* atan
* ataneq
* ceil
* ceileq
* cos
* coseq
* exp
* expeq
* floor
* flooreq
* log
* logeq
* round
* roundeq
* sin
* sineq
* sqrt
* sqrteq
* tan
* taneq


### Non-symmetric binary operators

* atan2
* atan2s
* atan2sop
* atan2eq
* atan2seq
* atan2opeq
* atan2sopeq
* pow
* pows
* powsop
* poweq
* powseq
* powopeq
* powsopeq

### Map-reduce (aggregate) operators

* any
* all
* sum
* prod
* norm2squared
* norm2
* norminf
* norm1
* sup
* inf
* argmin
* argmax


Credits
=======
(c) 2013 Mikola Lysenko. BSD
