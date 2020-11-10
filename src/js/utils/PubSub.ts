import PubSubType from '../types/PubSubType';

let instance: PubSub;

class PubSub implements PubSubType {
  storage: {[propName: string]: any};

  constructor() {
    if ( instance ) return instance;
    this.storage = {};
    instance = this;
  }

  public subscribe ( eventName: string, func: Function ) :void {
    if ( !this.storage.hasOwnProperty( eventName ) ) {
      this.storage[eventName] = [];
    }
    this.storage[eventName].push( func );
  }

  public publish ( eventName: string, data: any ) :void {
    ( this.storage[eventName] || [] ).forEach( ( func ) => { func( data ); });
  }

  public unSubscribe ( eventName: string, func: Function ) :void {
    const index = this.storage[eventName].indexOf( func );
    if ( index > -1 ) {
      this.storage[eventName].splice( index, 1 );
    };
  }
};

export default PubSub;