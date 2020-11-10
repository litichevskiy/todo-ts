import PubSubType from './PubSubType';

interface AlertType {
  container :HTMLElement;
  messageEl :HTMLElement;
  btnClose :HTMLElement;
  pubsub :PubSubType;
  id: any;
  showMessage( message :string ) :void;
  hideMessage() :void;
  keyBoardHandler( event :KeyboardEvent ) :void;
};

export default AlertType;