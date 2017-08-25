import { createElement, Component } from 'react'
import * as PropTypes from 'prop-types'

function generateDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function(WrappedComponent): any {
  return class Aware extends Component<any, any> {
    constructor(props, context) {
      super(props, context)
    }

    public static displayName = `Aware.${generateDisplayName(WrappedComponent)}`

    public static contextTypes = {
      message: PropTypes.func,
      model: PropTypes.object,
      subscribe: PropTypes.func
    }

    public componentDidMount(): void {
      this.context.subscribe(() => this.forceUpdate())
    }
    public render(): JSX.Element {
      return createElement(WrappedComponent, {
        ...this.props,
        message: this.context.message,
        model: this.context.model
      })
    }
  }
}
