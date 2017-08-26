import { Component, Children } from 'react'
import * as PropTypes from 'prop-types'

import validateUpdate from '../util/validateUpdate'

export default class Controller extends Component<any, any> {
  private model
  private subscriptions: Array<() => void> = []

  public static propTypes = {
    update: PropTypes.func,
    model: PropTypes.object
  }

  public static childContextTypes = {
    message: PropTypes.func,
    model: PropTypes.object,
    subscribe: PropTypes.func
  }

  public getChildContext(): any {
    return {
      message: this.message,
      model: this.model,
      subscribe: this.subscribe
    }
  }

  constructor(props: any, context: any) {
    super(props, context)

    this.model = this.props.model

    validateUpdate(this.props.update)
  }

  // add Aware component forceUpdate() callbacks for triggering context-based updates
  private subscribe = (fn) => this.subscriptions.push(fn)

  private message = async (msg): Promise<void> => {
    const [ model, command ] = this.props.update(this.model, msg)

    // update the model and update self
    this.model = model
    this.forceUpdate()

    // loop through Aware components and call their forceUpdate() callbacks
    this.subscriptions.forEach(fn => fn())

    if (command) {
      // Begin update cycle for async command
      this.message(await command)
    }

  }

  public render(): JSX.Element {
    return Children.only(this.props.children)
  }

}
