import * as OBC from "@thatopen/components";

/**
 * A basic component to say hello in the console.
 */
export class HelloWorldComponent extends OBC.Component {
  static readonly uuid = "60bd6763-f9ff-4820-a04f-2054922c0297" as const;

  enabled = true;

  private readonly _message = "Hello";

  constructor(components: OBC.Components) {
    super(components);
    components.add(HelloWorldComponent.uuid, this);
  }

  greet(name: string) {
    const message = `${this._message} ${name}!`;
    console.log(message);
  }
}
