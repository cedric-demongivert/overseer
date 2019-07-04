import { EntityFilter } from './EntityFilter'
import { parser } from './parser'
import { AllMatchFilter } from './AllMatchFilter'

/**
* Parse the given filter and return an instanciation.
*
* @param {string} text - A filter to parse.
*
* @return {EntityFilter} An instanciation of the given filter.
*/
EntityFilter.parse = function (text) {
  const result = parser.parse(text)
  result.text = text
  return result
}

EntityFilter.DEFAULT = new AllMatchFilter()

export { EntityFilter }
