const texts = [
  {
    description: "台灣的第一家電視台",
    choices: "台視/央視/民視/中天",
    answer: "台視",
  },
  {
    description: "西元哪一年台視和中視開始播放彩色電視節目",
    choices: "1969/1970/1971/1972",
    answer: "1969",
  },
  {
    description: "歷史上將什麼電視系統稱做機械式電視",
    choices: "貝爾德/貝納頌/小被被/心肝寶貝",

    answer: "貝爾德",
  },
  {
    description: "哪種系統則被稱為電子式電視",
    choices: "佐里金/佑里銀/亮晶晶/佐衛門",
    answer: "佐里金",
  },
  {
    description:
      "通常會先把聲音轉成電子訊號，形成無線電波後，再用天線發射，接著再將無線電波還原成「聲音」。",
    choices: "電視/廣播/報紙/網路",
    answer: "廣播",
  },
  {
    description: "就算停電，只要有乾電池就可以接收到資訊。",
    choices: "資訊精靈/廣播/報紙/網路",
    answer: "廣播",
  },
  {
    description: "可以透過遙控器轉檯，接收不同的資訊。",
    choices: "電視/資訊精靈/報紙/網路",
    answer: "電視",
  },
  {
    description: "只能用文字跟圖片傳遞資訊。",
    choices: "假資訊/廣播/報紙/電視",
    answer: "報紙",
  },
  {
    description: "資訊的傳遞最快，不受時差、地區及氣候影響。",
    choices: "資訊精靈/廣播/報紙/網路",
    answer: "網路",
  },
  {
    description: "可以用很多特效，搭配動態圖傳遞資訊。",
    choices: "電視/電影/報紙/網路",
    answer: "電影",
  },
  {
    description:
      "喜歡把資訊藏起來，不是真的不告訴你，用一些小技巧，應該都可以發現我只是在開玩笑吧？他是",
    choices: "假資訊/資訊精靈/電視/網路",
    answer: "假資訊",
  },
  {
    description:
      "想請他幫忙，要先說一些關鍵字，像是發生在哪裡、事件發生的時間、跟事件相關的人、為什麼發生、以及事件簡單說明！他是",
    choices: "假資訊/資訊精靈/電視/網路",
    answer: "資訊精靈",
  },
  {
    description:
      "只要你切換「頻率」，就能聽到更多地資訊，不管是在車上，或是在路上，都可以收聽廣播節目，而且不用付費！",
    choices: "資訊精靈/廣播/報紙/網路",
    answer: "廣播",
  },
  {
    description: "有紙本也有電子版本的！",
    choices: "電視/報紙/電影/網路",
    answer: "報紙",
  },
  {
    description:
      "有時候是故意傳錯資訊，但也不是每一次都是故意的，有時是聽不清楚或漏掉其他人想說的話… 。",
    choices: "假資訊/資訊精靈/電視/網路",
    answer: "假資訊",
  },
  {
    description:
      "我來自一個大家族，家中每個人都有自己關注的主題，有流行、健康、教育等等。我們會用文字和圖片撰寫自己關注主題的最新資訊。",
    choices: "雜誌/廣播/資訊精靈/電影",
    answer: "雜誌",
  },
  {
    description:
      "他會把最重要的內容放在最前面！不得不提的是，他極度討厭下雨天，雨水會讓整理好的資訊變成一團黏糊糊的紙。",
    choices: "電視/報紙/電影/網路",
    answer: "報紙",
  },
  {
    description: "閱讀新聞四個步驟",
    choices: "想問想找/想想好想/想問思思/想問找查",
    answer: "想問找查",
  },
  // {
  //   description: "遊戲主角",
  //   choices: "萊西/西瓜/小萊/來來",
  //   answer: "萊西",
  // },
  {
    description: "沒有辦法用圖片傳遞資訊的媒體。",
    choices: "電視/電影/報紙/廣播",
    answer: "廣播",
  },
];

const textQuestions = texts.map((q) => {
  const question = { ...q };
  question.choices = question.choices
    .trim()
    .split("/")
    .sort(() => Math.random() - 0.5);
  return question;
});

export { texts, textQuestions };
