const getFormValues = ( form :HTMLFormElement ) :{ [key:string]: string } => {
  return [...form.elements].reduce(( combaine, item :any ) => {
    const { name, value } = item;
    if( name ) combaine[name] = value;
    return combaine;
  }, {});
};

export default getFormValues;