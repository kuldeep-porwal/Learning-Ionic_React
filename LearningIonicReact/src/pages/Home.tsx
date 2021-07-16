import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

import { bluetooth, star, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logOut, presentToast } from "../config/firebaseConfig";
import { generateRandomWords } from "../data/WordList";

type WordType = {
  word: string;
  done: boolean;
  correct: boolean;
};
let defaultWordState: WordType[] = [];

defaultWordState = generateRandomWords(0).map((word) => ({
  word: word,
  done: false,
  correct: false,
}));

// import { generateRandomWords } from "../data/WordList";

// type WordType = {
//   word: string;
//   done: boolean;
//   correct: boolean;
// };
// let defaultWordState: WordType[] = [];

// defaultWordState = generateRandomWords.map((word) => ({
//   word: word,
//   done: false,
//   correct: false,
// }));

const Home: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [totalNumberCount, setTotalNumberCount] = useState<number>(10);
  const [tempWordList, settempWordList] =
    useState<WordType[]>(defaultWordState);
  const [correctTypedWords, setCorrectTypedWords] = useState<WordType[]>([]);
  const [wrongTypedWords, setWrongTypedWords] = useState<WordType[]>([]);
  const [yourTypedWords, setYourTypedWords] = useState<WordType[]>([]);
  async function onLogout() {
    const res = await logOut();
    if (res) {
      window.location.href = "/login";
    }
  }

  function checkTypedWord(typedWord: string) {
    // console.log(typedWord);
    setInput(typedWord);

    if (typedWord == null || typedWord.trim() == "") {
      setInput("");
      return;
    }

    if (tempWordList != null && tempWordList.length <= 0) {
      presentToast("No Words Left for typing", 1000, "danger");
      setInput("");
      return;
    }
    if (isSpaceEntered(typedWord)) {
      typedWord = typedWord.trim();
      let firstWord = tempWordList[0];

      if (firstWord.word.trim() === typedWord.trim()) {
        setCorrectTypedWords((x) => {
          firstWord.done = true;
          firstWord.correct = true;
          return [...x, firstWord];
        });
      } else {
        setWrongTypedWords((x) => {
          firstWord.done = true;
          firstWord.correct = false;
          return [...x, firstWord];
        });
      }
      settempWordList(
        tempWordList.filter((word) => {
          return word.word !== firstWord.word;
        })
      );

      setYourTypedWords((x) => {
        return [
          ...x,
          { word: typedWord, correct: firstWord.correct, done: firstWord.done },
        ];
      });
      setInput("");
    }
  }

  function isSpaceEntered(typedWord: string) {
    if (typedWord != null && typedWord.length > 0) {
      if (typedWord[typedWord.length - 1] == " ") return true;
    }
    return false;
  }

  function generateMoreWords() {
    settempWordList(
      generateRandomWords(totalNumberCount <= 0 ? 10 : totalNumberCount).map(
        (word) => ({
          word: word,
          done: false,
          correct: false,
        })
      )
    );
  }

  useEffect(() => {
    console.log(input);
  }, [input]);
  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonButton onClick={onLogout}>Logout</IonButton>
          <IonCardHeader>
            <IonCardTitle>Word List</IonCardTitle>
          </IonCardHeader>
          {tempWordList.length > 0 ? (
            <IonCardContent>
              {tempWordList.map((word) => (
                <span
                  key={word.word}
                  className={`word ${
                    word.done && word.correct ? "correct" : ""
                  }`}
                >
                  {word.word}
                </span>
              ))}
            </IonCardContent>
          ) : (
            <IonCardContent>
              <IonLabel>
                <h1 className="incorrect">No More Words Available</h1>
              </IonLabel>
              <IonInput
                placeholder="How Many Words"
                value={totalNumberCount}
                onIonChange={(e: any) => {
                  setTotalNumberCount(e.target.value);
                }}
                style={{ border: "thin solid black" }}
              ></IonInput>
              <IonButton onClick={generateMoreWords}>
                Generate More Words
              </IonButton>
            </IonCardContent>
          )}
          <IonCardContent>
            <IonInput
              placeholder="type above words here.."
              value={input}
              onIonChange={(e: any) => {
                checkTypedWord(e.target.value);
              }}
            ></IonInput>
          </IonCardContent>
          <IonCardContent>
            <IonLabel>Correct Typed Words</IonLabel>
            {correctTypedWords.map((word, index) => (
              <span key={index} className="word correct">
                {word.word}
              </span>
            ))}
          </IonCardContent>
          <IonCardContent>
            <IonLabel>InCorrect Typed Words</IonLabel>
            {wrongTypedWords.map((word, index) => (
              <span key={index} className="word incorrect">
                {word.word}
              </span>
            ))}
          </IonCardContent>
          <IonCardContent>
            <IonLabel>Words that you typed</IonLabel>
            {yourTypedWords.map((word, index) => (
              <span
                key={index}
                className={`word ${
                  word.done && word.correct ? "correct" : "incorrect"
                }`}
              >
                {word.word}
                {index}
              </span>
            ))}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
