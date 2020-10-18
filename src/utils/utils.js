export const capitalizeFirstLetterInSentence = (sentence) => {
  if (sentence && sentence.length) {
    return sentence.split(" ")[0][0].toUpperCase()
      + sentence.split(" ")[0].slice(1)
      + " "
      + sentence.split(" ").slice(1).join(" ");
  }
};