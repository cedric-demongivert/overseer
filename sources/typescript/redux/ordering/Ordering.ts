import { List } from 'immutable'

import { OrderingDirection } from './OrderingDirection'
import { Order } from './Order'

const EMPTY : List<Order> = List<Order>()

export class Ordering {
  public readonly orders : List<Order>

  public constructor (orders : List<Order> = EMPTY) {
    this.orders = orders
  }

  /**
  * Return the ordering direction of the given field.
  *
  * @param field - The field to search.
  *
  * @return The ordering direction of the given field.
  */
  public getDirection (field : number) : OrderingDirection {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        return order.direction
      }
    }

    return undefined
  }

  /**
  * Return true if the given field is ordered.
  *
  * @param field - The field to search.
  *
  * @return True if the given field is ordered.
  */
  public isOrdered (field : number) : boolean {
    return this.getDirection(field) != null
  }

  /**
  * Toggle ordering of a given field.
  *
  * If the given field was not ordered, it will be ordered in an descending fashion.
  * If the given field was ordered in a descending fashion, it will be ordered in an ascending fashion.
  * If the given field was ordered in an ascending fashion, it will be not ordered at all.
  *
  * @param field - The identifier of the field to toggle.
  *
  * @return {State} A new updated ordering instance.
  */
  public toggle (field : number) : Ordering {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        if (order.direction === OrderingDirection.ASCENDING) {
          return new Ordering(orders.delete(index))
        } else {
          return new Ordering(orders.set(index, order.ascending()))
        }
      }
    }

    return new Ordering(orders.push(Order.descending(field)))
  }

  /**
  * Keep only the given field.
  *
  * @param field - Identifier of the field to keep.
  *
  * @return A new updated ordering structure.
  */
  public only (field : number) : Ordering {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        return new Ordering(List.of(order))
      }
    }

    return Ordering.EMPTY
  }

  /**
  * Order a given field.
  *
  * @param field - Identifier of the field to order.
  * @param [direction = Direction.ASCENDING] - The ordering direction to use.
  *
  * @return A new updated ordering instance.
  */
  public orderBy (field : number, direction : OrderingDirection = OrderingDirection.ASCENDING) : Ordering {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        if (order.direction === direction) {
          return this
        } else {
          return new Ordering(orders.set(index, order.setDirection(direction)))
        }
      }
    }

    return new Ordering(orders.push(new Order(field, direction)))
  }

  /**
  * Order a field in an ascending fashion.
  *
  * @param field - Identifier of the field to order.
  *
  * @return An updated instance of this configuration.
  */
  public ascending (field : number) : Ordering {
    return this.orderBy(field, OrderingDirection.ASCENDING)
  }


  /**
  * Order a field in an descending fashion.
  *
  * @param field - Identifier of the field to order.
  *
  * @return An updated instance of this configuration.
  */
  public descending (field : number) : Ordering {
    return this.orderBy(field, OrderingDirection.DESCENDING)
  }

  /**
  * Unordering a given field.
  *
  * @param field - The identifier of the field to unorder.
  *
  * @return An updated instance of this configuration.
  */
  public delete (field : number) : Ordering {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        return new Ordering(orders.delete(index))
      }
    }

    return this
  }

  /**
  * Return the ordering index of the given field.
  *
  * @param field - Identifier of a field to search.
  *
  * @return The ordering index of the given field.
  */
  public indexOf (field : number) : number {
    const orders : List<Order> = this.orders

    for (let index = 0, size = orders.size; index < size; ++index) {
      const order : Order = orders.get(index)

      if (order.field === field) {
        return index
      }
    }

    return -1
  }

  public equals (other : any) : boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Ordering) {
      if (other.orders.size !== this.orders.size) return false

      const orders : List<Order> = this.orders
      const otherOrders : List<Order> = other.orders

      for (let index = 0, size = orders.size; index < size; ++index) {
        const order : Order = orders.get(index)
        const otherOrder : Order = otherOrders.get(index)

        if (!order.equals(otherOrder)) return false
      }

      return true
    }

    return false
  }
}

export namespace Ordering {
  export const EMPTY : Ordering = new Ordering()
}
