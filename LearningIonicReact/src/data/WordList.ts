// export const wordList = [
//   "kuldeep",
//   "myword",
//   "dfsdaf",
//   "dfad",
//   "qwery",
//   "piyu",
// ];
export const wordList: string[] = generateRandomWords(0);
export function generateRandomWords(noOfWords: number = 10) {
  let wordList = [];
  for (let i = 0; i < noOfWords; i++) {
    console.log("outer loop");
    let lengthOfWord = randomInteger(3, 9);
    let word = "";
    for (let j = 0; j < lengthOfWord; j++) {
      console.log("inner loop", i, j, lengthOfWord);
      word = word + String.fromCharCode(64 + randomInteger(1, 26));
    }
    wordList.push(word);
  }
  return wordList;
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
