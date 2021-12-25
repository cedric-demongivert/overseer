import { PureComponent } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'

import { Match } from '../../redux/Match'

const EMPTY_MATCH : Match = new Match()

export class Highlight extends PureComponent<Highlight.Properties> {
  public static defaultProps : Highlight.Properties = {
    children: '',
    match: EMPTY_MATCH
  }

  /**
  * @see React/Component#render
  */
  public render () : ReactNode {
    if (this.props.match.size > 0) {
      return this.getTokens().map(
        function (token : string, index : number) : ReactNode {
          if (index % 2 === 1) {
            return <span className='highlight' key={index}>{ token }</span>
          } else {
            return <span key={index}>{ token }</span>
          }
        }
      )
    } else {
      return this.props.children
    }
  }

  /**
  * @return An array of matched / unmatched token sequence in accordance with this component properties.
  */
  public getTokens () : string[] {
    const result : string[] = []
    const match : Match = this.props.match
    const content : string = this.props.children

    result.push(content.substring(0, this.getBoundary(0)))

    for (let index = 0, size = match.size - 1; index < size; ++index) {
      result.push(content.substring(this.getBoundary(index), this.getBoundary(index + 1)))
    }

    result.push(content.substring(this.getBoundary(match.size - 1), content.length))

    return result
  }

  /**
  * @param {number} index - Index of the boundary to get.
  *
  * @return {number} The nth text boundary.
  */
  public getBoundary (index : number) : number {
    const match : Match = this.props.match
    const boundary : number = match.get(index)

    if (index === 0 && boundary == null) {
      return 0
    } else if (index === match.size - 1 && boundary == null) {
      return this.props.children.length
    } else {
      return boundary
    }
  }
}

export namespace Highlight {
  export type Properties = {
    children: string,
    match: Match
  }
}
