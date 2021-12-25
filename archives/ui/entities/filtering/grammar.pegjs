{
  import { ConjunctionFilter } from './ConjunctionFilter'
  import { DisjunctionFilter } from './DisjunctionFilter'
  import { SubstringFilter } from './SubstringFilter'
  import { NegationFilter } from './NegationFilter'
  import { NumberFilter } from './NumberFilter'
  import { RangeFilter } from './RangeFilter'
}

Filter = _ disjunction:Disjunction _ { return disjunction }

Disjunction = first:Conjunction elements:((_ ',' _) Conjunction)* {
  const conjunctions = [first]

  for (let index = 0, size = elements.length; index < size; ++index) {
    conjunctions.push(elements[index][1])
  }

  return new DisjunctionFilter(conjunctions)
}

Conjunction = elements:(_ Assertion)* {
  const assertions = []

  for (let index = 0, size = elements.length; index < size; ++index) {
    assertions.push(elements[index][1])
  }

  return new ConjunctionFilter(assertions)
}

Assertion = assertion:(
  Negation / TextAssertion / NumericAssertion / WordAssertion
) { return assertion }

Negation = 'not:' assertion:Assertion {
  return new NegationFilter(assertion)
}

WordAssertion = chars:([^\t ,]+) {
  return new SubstringFilter(chars.join('').toLowerCase())
}

TextAssertion = '"' chars:(([^"]/'\\"')*) '"' {
  return new SubstringFilter(chars.join('').replace('\"', '"').toLowerCase())
}

NumericAssertion = assertion:(RangeAssertion / SingleNumberAssertion) {
  return assertion
}

SingleNumberAssertion = [0-9]+ {
  return new NumberFilter(parseInt(text()))
}

RangeAssertion = left:([0-9]+) '-' right:([0-9]+) {
  return new RangeFilter(parseInt(left), parseInt(right))
}

_ = [ \t]*
