import QuizService from "../../services/Quiz.service";
import { cardImages } from "../../assets/card-images/CardImages";

const MAX_QUESTIONS = 10;

const drawImageChoices = (imgIndex) => {
  // 抽四個選項
  const randomChoices = [...Array(8).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // 其中一個換成正答
  if (!randomChoices.includes(imgIndex)) {
    const replaced = Math.floor(Math.random() * 4);
    randomChoices[replaced] = imgIndex;
  }

  return randomChoices;
};
const getImageQuestions = () => {
  return [...Array(8).keys()].map((num) => ({
    description: cardImages[num].information,
    choices: drawImageChoices(num),
    answer: num,
    src: cardImages[num].src,
    type: "image",
  }));
};

const getTextQuestions = async () => {
  try {
    const res = await QuizService.getRandomQuestions();
    const textsQuestions = res.data;
    textsQuestions.forEach((q) => {
      q.choices = q.choices.split("/").sort(() => Math.random() - 0.5);
      q.type = "text";
    });
    return textsQuestions;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const drawQuestions = async () => {
  const randomImageDraw = getImageQuestions();
  const randomTextDraw = await getTextQuestions();

  const combination = randomImageDraw
    .concat(randomTextDraw)
    .sort(() => Math.random() - 0.5)
    .slice(0, MAX_QUESTIONS);

  return combination;
};

export { drawQuestions };
