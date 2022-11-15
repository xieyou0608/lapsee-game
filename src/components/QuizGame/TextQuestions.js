const textQuestions = [
  {
    description: "台灣的第一家電視台",
    choices: "台視、央視、民視、中天"
      .split("、")
      .sort(() => Math.random() - 0.5),
    answer: "台視",
  },
  {
    description: "西元哪一年台視和中視開始播放彩色電視節目",
    choices: "1969/1970/1971/1972".split("/").sort(() => Math.random() - 0.5),
    answer: "1969",
  },
  {
    description: "歷史上將什麼電視系統稱做機械式電視",
    choices: "貝爾德/貝納頌/小被被/心肝寶貝"
      .split("/")
      .sort(() => Math.random() - 0.5),
    answer: "貝爾德",
  },
  {
    description: "哪種系統則被稱為電子式電視",
    choices: "佐里金/佑里銀/亮晶晶/佐衛門"
      .split("/")
      .sort(() => Math.random() - 0.5),
    answer: "佐里金",
  },
];

export { textQuestions };
