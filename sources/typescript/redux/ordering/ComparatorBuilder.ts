import { firstBy } from 'thenby'

import { Ordering } from './Ordering'
import { Order } from './Order'
import { OrderingDirection } from './OrderingDirection'

export class ComparatorBuilder {
  private _comparators : Map<number, any>

  /**
  * Create a new comparator builder.
  *
  * @param [configuration] - Builder initial configuration.
  */
  public constructor (configuration : any[]) {
    this._comparators = new Map<number, any>()

    if (configuration && configuration.length > 1) {
      for (let index = 0; index < configuration.length; index += 2) {
        this._comparators.set(configuration[index], configuration[index + 1])
      }
    }
  }

  /**
  * Create and return a comparison function that match the given ordering.
  *
  * @param ordering - An ordering to match.
  *
  * @return An comparison function in accordance with the given ordering.
  */
  public orderBy (ordering : Ordering) : Function {
    let result = undefined

    for (let index = 0; index < ordering.orders.size; ++index) {
      const order : Order = ordering.orders.get(index)

      if (this._comparators.has(order.field)) {
        if (result == null) {
          result = firstBy(
            this._comparators.get(order.field),
            order.direction === OrderingDirection.ASCENDING ? 1 : -1
          )
        } else {
          result = result.thenBy(
            this._comparators.get(order.field),
            order.direction === OrderingDirection.ASCENDING ? 1 : -1
          )
        }
      }
    }

    return result
  }

  public fields () : Iterator<number> {
    return this._comparators.keys()
  }

  public hasComparaotor (field : number) : boolean  {
    return this._comparators.has(field)
  }

  public setComparator (field : number, comparator : any) : void {
    this._comparators.set(field, comparator)
  }

  public deleteComparator (field : number) : void {
    this._comparators.delete(field)
  }

  public clear () : void {
    this._comparators.clear()
  }
}
