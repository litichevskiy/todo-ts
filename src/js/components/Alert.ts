import PubSubType from '../types/PubSubType';
import AlertType from '../types/AlertType';
import { SHOW_ALERT_MESSAGE, ESC_KEY } from '../constants';

const HIDE_MESSAGE_MS = 6000; // ms

class Alert implements AlertType {
  container :HTMLElement;
  messageEl :HTMLElement;
  btnClose :HTMLElement;
  pubsub :PubSubType;
  id: any;

  constructor({ container, messageEl, btnClose, pubsub }) {
    this.container = container;
    this.messageEl = messageEl;
    this.btnClose = btnClose;
    this.pubsub = pubsub;
    this.id;

    this.btnClose.addEventListener('click', this.hideMessage );
    this.pubsub.subscribe( SHOW_ALERT_MESSAGE, this.showMessage );
  }

  showMessage = ( message :string ) :void => {
    this.messageEl.innerHTML = message;
    this.container.classList.add('active');
    document.addEventListener('keydown', this.keyBoardHandler );
    this.id = setTimeout( this.hideMessage, HIDE_MESSAGE_MS );
  }

  hideMessage = () :void => {
    this.messageEl.innerHTML = '';
    this.container.classList.remove('active');
    clearInterval( this.id );
    document.removeEventListener('keydown', this.keyBoardHandler );
  }

  keyBoardHandler = ( event :KeyboardEvent ) :void => {
    if( event.key.toLowerCase() === ESC_KEY ) this.hideMessage();
  }
};

export default Alert;