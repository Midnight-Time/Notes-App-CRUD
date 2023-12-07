const removeDublicatesFromArray = (array: string[]) => {
  const arrayWithoutDublicates = array.filter((item, i) => {
    return array.indexOf(item) === i;
  });
  return arrayWithoutDublicates;
};
export default removeDublicatesFromArray;
