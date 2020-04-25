import { OrderingDirection } from './OrderingDirection'

export class Order {
  public readonly field     : number
  public readonly direction : OrderingDirection

  public constructor (field : number, direction : OrderingDirection = OrderingDirection.ASCENDING) {
    this.field = field
    this.direction = direction
  }

  public ascending () : Order {
    return new Order(this.field, OrderingDirection.ASCENDING)
  }

  public descending () : Order {
    return new Order(this.field, OrderingDirection.DESCENDING)
  }

  public setDirection (direction : OrderingDirection) : Order {
    return new Order(this.field, direction)
  }

  public setField (field : number) : Order {
    return new Order(field, this.direction)
  }

  public toggle () : Order {
    switch (this.direction) {
      case OrderingDirection.DESCENDING:
        return this.ascending()
      case OrderingDirection.ASCENDING:
        return this.descending()
    }
  }

  public equals (other : any) : boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Order) {
      return other.field === this.field &&
             other.direction === this.direction
    }

    return false
  }
}

export namespace Order {
  export function ascending (field : number) : Order {
    return new Order(field, OrderingDirection.ASCENDING)
  }

  export function descending (field : number) : Order {
    return new Order(field, OrderingDirection.DESCENDING)
  }
}
