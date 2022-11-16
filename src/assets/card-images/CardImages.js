import card1 from "./資訊精靈.PNG";
import card2 from "./假資訊.PNG";
import card3 from "./報紙村長.PNG";
import card4 from "./電視村長.PNG";
import card5 from "./電影.PNG";
import card6 from "./網際網路村長.PNG";
import card7 from "./廣播村長雙胞胎.PNG";
import card8 from "./雜誌.PNG";
import backImage from "./card-back.png";

const cardImages = [
  {
    name: "資訊精靈",
    src: card1,
    mark: "1",
    information:
      "不管什麼問題，都難不倒我！只要跟我說一些關鍵字，像是事件發生的地點、時間、原因、相關的人事物，或是簡單地說明，我就能夠提供你相關的資訊。",
  },
  {
    name: "假資訊",
    src: card2,
    mark: "2",
    information:
      "每個人都說我不對，但我只是想看看大家有沒有認真看我，也不是每次都是故意的，所以用一些小技巧把資訊藏起來，我想你應該能發現我在開玩笑吧？",
  },
  {
    name: "報紙村長",
    src: card3,
    mark: "3",
    information:
      "刷刷刷⋯，天一亮，我就會決定要穿什麼衣服，上面有著最新的資訊，有時也會附上照片。為了讓你更方便接收訊息，我會把最重要的內容放在最前面！不得不提的是，我很討厭下雨天，雨水會讓我整理好的資訊變成一團黏糊糊的紙。",
  },
  {
    name: "電視村長",
    src: card4,
    mark: "4",
    information:
      "我經常出現在人類世界裡，一個叫做客廳的地方。遙控器是我的好夥伴，可以讓我知道人類的需求。只要你「轉臺」，就能接收更多不同的資訊。",
  },
  {
    name: "電影",
    src: card5,
    mark: "5",
    information:
      "每一次的閃亮登場前，我都需要經過一段時間。剛開始我只能在動態圖中，選擇黑白兩種顏色，甚至連聲音都沒有，憋得我好難受。經過一段時間，我不但能讓資訊有音效，還可以加各式各樣的特效，讓大家都目不轉睛地接收我的訊息。",
  },
  {
    name: "網際網路村長",
    src: card6,
    mark: "6",
    information:
      "我無時無刻都在傳遞各式各樣的訊息，也擁有最即時、最豐富的資訊，所以每個人都離不開我。我可是最萬能的呢！",
  },
  {
    name: "廣播村長雙胞胎",
    src: card7,
    mark: "7",
    information:
      "即便我只能透過聲音，讓你發現我的存在，不過我傳遞資訊的能力可不輸其他媒體。我通常會先把我的聲音轉成電子訊號，形成無線電波後，再用天線發射，接著再將無線電波還原成「聲音」，就能輕易地讓你接收到資訊。",
  },
  {
    name: "雜誌",
    src: card8,
    mark: "8",
    information:
      "我來自一個大家族，家中每個人都有自己關注的主題，有流行、健康、教育等等。我們會用文字和圖片撰寫自己關注主題的最新資訊，但蒐集資訊不容易，通常需要付費才能看到我們整理好的資訊。值得一提的是，我們家族的知識量較為豐富，所以人們會反覆閱讀和長久保存。",
  },
];

export { cardImages, backImage };
