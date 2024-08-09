// import * as THREE from "three";
// import * as OBC from "openbim-components";
// import {Component} from'

// /**
//  * A basic component to say hello in the console.
//  */
// export class HelloWorldComponent extends OBC.Component
//   implements OBC.Disposable, OBC.Updateable  {
// 	static readonly uuid = "0f89b34b-fc6b-4b97-b56d-1edeb0a308a2";

// 	readonly onAfterUpdate = new OBC.Event();

// 	readonly onBeforeUpdate = new OBC.Event();

//     readonly onDisposed = new OBC.Event();

// 	enabled = true;

// 	someMesh = new THREE.Mesh(); 

// 	private readonly _message = "Hello";

// 	constructor(components: OBC.Components) {
// 		super(components);
// 		components.add(HelloWorldComponent.uuid, this);
// 	}

// 	greet(name: string) {
// 		const message = `${this._message} ${name}!`;
// 		console.log(message);
// 	}

// 	dispose() {
// 		this.enabled = false;
// 		// Make sure to clean up the events
// 		this.onBeforeUpdate.reset();
// 		this.onAfterUpdate.reset();
// 		// Use the disposer component to easily dispose THREE.js objects
// 		const disposer = this.components.get(OBC.Disposer);
// 		disposer.destroy(this.someMesh);
//         this.onDisposed.trigger();
// 		this.onDisposed.reset();
//     }

//     async update(delta?: number) {
// 		this.onBeforeUpdate.trigger();
// 		console.log("Updated! Delta: " + delta);
// 		this.onAfterUpdate.trigger();
// 	}
// }