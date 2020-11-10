interface PubSubType {
  storage :{ [key: string]: Function[] };
  subscribe( eventName :string, func :Function ) :void;
  publish( eventName :string, data? :any ) :void;
  unSubscribe( eventName :string, func :Function ) :void;
}

export default PubSubType;