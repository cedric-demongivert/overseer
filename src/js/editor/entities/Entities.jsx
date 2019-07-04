import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { ordering } from '@redux'

import * as EntityField from './EntityField'
import * as comparators from './comparators'
import { EntityFilter } from './filtering'
import { getLabel } from './getLabel'

export class Entities extends PureComponent {
  /**
  * A component that filter and order entities of an entity-component-system in order to pass them to it's child component.
  */
  constructor (props, context) {
    super(props, context)

    this.handleEntityComponentSystemChange(props.entityComponentSystem)
  }

  /**
  * @see React/Component#componentWillUpdate
  */
  componentWillUpdate (nextProps) {
    if (this.props.entityComponentSystem !== nextProps.entityComponentSystem) {
      this.handleEntityComponentSystemChange(nextProps.entityComponentSystem)
    }
  }

  /**
  *
  */
  handleEntityComponentSystemChange (ecs) {
    this._comparatorBuilder = this.createComparatorBuilder(ecs)
  }

  /**
  *
  */
  createComparatorBuilder (ecs) {
    const result = new ordering.ComparatorBuilder()

    result.setComparator(
      EntityField.IDENTIFIER,
      comparators.createEntityIdentifierComparator(ecs)
    )

    result.setComparator(
      EntityField.LABEL,
      comparators.createEntityLabelComparator(ecs)
    )

    return result
  }

  /**
  * @see React/Component#render()
  */
  render () {
    return React.cloneElement(this.props.children, {
      [this.props.as]: this.getEntities()
    })
  }

  /**
  * @return {Array<number>} An array of entity in accordance with this component properties.
  */
  getEntities () {
    return this.getOrderedEntities()
  }

  /**
  * @return {Array<number>} An array of entities ordered in regards of the ordering passed as this component property.
  */
  getOrderedEntities () {
    const entities = this.getEntitiesWithRequestedTypes()

    entities.sort(this.getComparator())

    return entities
  }

  /**
  * @return {function} A comparator built from the ordering configuration passed as a property of this component.
  */
  getComparator () {
    return this._comparatorBuilder.orderBy(this.props.ordering)
  }

  /**
  * @return {Array<number>} An array of entities with the types requested by this component properties.
  */
  getEntitiesWithRequestedTypes () {
    if (this.props.with.length <= 0) return this.getAllEntities()

    const views = this.getEntityViewsWithSmallestFirst()
    const smallestView = views[0]
    const result = []

    for (let index = 0, size = smallestView.size; index < size; ++index) {
      const entity = smallestView.get(index)
      let valid = true

      for (
        let vindex = 1, vsize = views.size;
        vindex < vsize && valid;
        ++vindex
      ) { valid = views[vindex].has(entity) }

      if (valid) { result.push(entity) }
    }

    return result
  }

  /**
  * @return {Array<number>} An array with all entity-component-system entities.
  */
  getAllEntities () {
    const entities = this.props.entityComponentSystem.entities
    const result = new Array(entities.size)

    for (let index = 0, size = entities.size; index < size; ++index) {
      result[index] = entities.get(index)
    }

    return result
  }

  /**
  * Return an array of entity view related to the requested types passed in
  * this component property. The smallest view will always be at index 0 of
  * the returned array.
  *
  * @return {Array<Collection<number>>} An array of entity views.
  */
  getEntityViewsWithSmallestFirst () {
    const ecs = this.props.entityComponentSystem
    const result = new Array(this.props.with.length)

    result[0] = ecs.getEntitiesWithType(this.props.with[0])

    for (let index = 1, size = this.props.with.length; index < size; ++index) {
      const view = ecs.getEntitiesWithType(this.props.with[index])

      if (result[0].size > view.size) {
        result[index] = result[0]
        result[0] = view
      } else {
        result[index] = view
      }
    }

    return result
  }
}

Entities.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  ordering: PropTypes.instanceOf(ordering.State).isRequired,
  as: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  with: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired
}

Entities.defaultProps = {
  as: 'value',
  ordering: ordering.State.DEFAULT,
  with: []
}
