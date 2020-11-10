const getParentNode = ( target :HTMLElement, tagName :string  ) :HTMLElement => {
  if( !tagName ) return;
  while( target.tagName  ) {
    if( target.tagName === tagName ) return target;
    else target = target.parentElement;
  }
};

export default getParentNode;