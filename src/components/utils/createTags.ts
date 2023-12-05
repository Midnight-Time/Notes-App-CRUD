const createTags = (enteredText: string) => {
  const val = enteredText.split(/(#[a-z,а-я\d-]+)/gi);
  let array: string[] = [];
  for (let i = 0; i < val.length; i++) {
    if (val[i].charAt(0) === "#") {
      const tagWithoutSymbols = val[i].replace(/[.,/!$%^&*;:{}=\-_`~()]/g, "");
      array.push(tagWithoutSymbols);
    }
  }
  let filteredArray = array.filter((tag, i) => {
    return array.indexOf(tag) === i;
  });
  return filteredArray;
};

export default createTags;
