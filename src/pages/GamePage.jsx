import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/stage1.png";
import tukkomi from "../assets/images/tukkomi.png";
import boke from "../assets/images/boke.png";
import mic from "../assets/images/mic.png";
import { DialogueBoxLeft } from "../components/DialogueBoxLeft";
import { DialogueBoxRight } from "../components/DialogueBoxRight";
import { ChoiceButton } from "../components/ChoiceButton";
import { AudienceGauge } from "../components/AudienceGauge";
import { TimingBar } from "../components/TimingBar";
import "./GamePage.css";

const scenario = [
  {
    speaker: "right",
    text: "どうもー",
  },
  {
    speaker: "left",
    text: "どうもー！！！",
  },
  {
    speaker: "right",
    text: "サンドウィッチマンです！",
  },
  {
    speaker: "left",
    text: "よろしくお願いします！",
  },
  {
    speaker: "right",
    text: "まあ、世の中興奮することっていっぱいあるけど",
  },
  {
    speaker: "left",
    text: "うん",
  },
  {
    speaker: "right",
    text: "1番興奮するのは、街頭アンケートな！",
  },
  {
    speaker: "right",
    text: "あのー、ダイエット中すみません",
  },
  {
    speaker: "left",
    text: "してねえよ別に！ただ歩いてるだけじゃねえか！なんだお前",
  },
  {
    speaker: "right",
    text: "アンケートにご協力願えませんか？",
  },
  {
    speaker: "left",
    text: "今忙しいから、他当たってくれよ",
  },
  {
    speaker: "right",
    text: "いや、あの、渋谷で10代の女性を中心に聞いてるんですけど",
  },
  {
    speaker: "left",
    text: "1個も当てはまってねえよ！六本木で俺30代だからさ！渋谷行け、渋谷！",
  },
  {
    speaker: "right",
    text: "まあ、誰でもいいんです",
  },
  {
    speaker: "left",
    text: "誰でもいいのかよ！どういうことだよ",
  },
  {
    speaker: "right",
    text: "もし、問題あるようでしたら音声も変えますし",
  },
  {
    speaker: "left",
    text: "うん",
  },
  {
    speaker: "right",
    text: "目の所にも、こう、材木を",
  },
  {
    speaker: "left",
    text: "モザイクね！",
  },
  {
    speaker: "right",
    text: "モザイク",
  },
  {
    speaker: "left",
    text: "なんでお前、目に材木はめ込んでこうやってアンケート答えてんだよ？カメラもねえしよ、別に",
  },
  {
    speaker: "right",
    text: "もう、本当にすぐ終わりますんで！",
  },
  {
    speaker: "left",
    text: "すぐ終わんの？本当に",
  },
  {
    speaker: "right",
    text: "すぐ終わります！",
  },
  {
    speaker: "left",
    text: "すぐ終わんのね？じゃあ、早くしてくれよ",
  },
  {
    speaker: "right",
    text: "えー、では、いきます",
  },
  {
    speaker: "left",
    text: "はい",
  },
  {
    speaker: "right",
    text: "このアンケートを何で知りましたか？",
  },
  {
    speaker: "left",
    text: "お前だよ！今、お前から聞いたわ！お前って書いとけ！お前！",
  },
  {
    speaker: "right",
    text: "あの、お名前聞いてもよろしいですか？",
  },
  {
    speaker: "left",
    text: "名前？伊達だよ",
  },
  {
    speaker: "right",
    text: "苗字もお願いします",
  },
  {
    speaker: "left",
    text: "苗字だよ！どこの世界に佐藤伊達とかがいるんだよ？テニスのペアか？俺は。伊達みきおっつーんだよ！",
  },
  {
    speaker: "right",
    text: "あなたは何か、ニックネームはありますか？",
  },
  {
    speaker: "left",
    text: "ニックネーム？",
  },
  {
    speaker: "right",
    text: "はい",
  },
  {
    speaker: "left",
    text: "あんまないけど、まあ、伊達ちゃんとか言われるかな",
  },
  {
    speaker: "right",
    text: "伊達ちゃん",
  },
  {
    speaker: "left",
    text: "おお",
  },
  {
    speaker: "right",
    text: "えー、そんなおデブちゃんに質問",
  },
  {
    speaker: "left",
    text: "誰がおデブちゃんだ！？言われるか！お前、そんなもん！伊達ちゃん！",
  },
  {
    speaker: "right",
    text: "えー、血液型は何型ですか？",
  },
  {
    speaker: "left",
    text: "おお",
  },
  {
    speaker: "right",
    text: "次の内から選んでください",
  },
  {
    speaker: "right",
    text: "A、A型。B、O型。C、B型。D、AB型",
  },
  {
    speaker: "left",
    text: "ややこしいわ、お前！なんだ、その聞き方！？お前！Bだ、B！",
  },
  {
    speaker: "right",
    text: "BのO型ですね",
  },
  {
    speaker: "left",
    text: "そうじゃねえよ！CのB型だよ！",
  },
  {
    speaker: "right",
    text: "CのB型ってなんですか（笑）",
  },
  {
    speaker: "left",
    text: "そうやって答えんだろ、これ！なあ？そうやって答えるんでしょ？これ！",
  },
  {
    speaker: "right",
    text: "また、特殊な",
  },
  {
    speaker: "left",
    text: "特殊じゃねえよ、お前！B型！",
  },
  {
    speaker: "right",
    text: "B型？",
  },
  {
    speaker: "left",
    text: "そうだよ！",
  },
  {
    speaker: "right",
    text: "えー、1人暮らしですか？それとも、その日暮らしですか？",
  },
  {
    speaker: "left",
    text: "何が聞きてえんだよ！？なんだ、その日暮らしって、お前。実家に住んでんだ！",
  },
  {
      speaker: "right",
    text: "実家？",
  },
  {
    speaker: "left",
    text: "そうだよ",
  },
  {
    speaker: "right",
    text: "えー。兄弟は何人ですか？",
  },
  {
    speaker: "left",
    text: "3人だよ",
  },
  {
    speaker: "right",
    text: "あ、すみません。そのうち、杯を交わしている兄弟は何人ですか？",
  },
  {
    speaker: "left",
    text: "そんな兄弟いねえわ！みんな、血の繋がった俺の兄弟だわ！",
  },
  {
    speaker: "right",
    text: "繋がった兄弟…っと",
  },
  {
    speaker: "left",
    text: "繋がった兄弟ってなんだよ！ぴんから兄弟みたいになってんじゃねえか！…なってねえよ！全然なってねえわ！",
  },
  {
    speaker: "right",
    text: "お仕事は、何力団をされてるんですか？",
  },
  {
    speaker: "left",
    text: "暴力団限定だろ、それよ！ふざけてんのかお前、さっきから！俺は、お前のアンケートに協力してんだからな、協力団だよ！",
  },
  {
    speaker: "right",
    text: "協力団ってなんですか？",
  },
  {
    speaker: "left",
    text: "協力団って書いとけ！…会社員。会社員だよ",
  },
  {
    speaker: "right",
    text: "会社員？",
  },
  {
    speaker: "left",
    text: "そうだよ",
  },
  {
    speaker: "right",
    text: "えー、会社員ということで、いろんな派閥があると思われますが",
  },
  {
    speaker: "left",
    text: "まあ、いくつかあるけどね",
  },
  {
    speaker: "right",
    text: "あなたは、うどん派ですか？蕎麦派ですか？",
  },
  {
    speaker: "left",
    text: "そんな派閥ねえわ！おい、なんだ、そのちっぽけ会社は",
  },
  {
    speaker: "right",
    text: "まあ、どっちかって言ったら？",
  },
  {
    speaker: "left",
    text: "どっちだっていいよ！そんなのよ！うどんでいい、うどんで！",
  },
  {
    speaker: "right",
    text: "蕎麦派に寝返る可能性ってどれくらいありますか？",
  },
  {
    speaker: "left",
    text: "結構あるよ？今日の昼飯、ざる蕎麦食ってるからね",
  },
  {
    speaker: "right",
    text: "えーでは、中東和平問題で揺れる世界情勢ですが",
  },
  {
    speaker: "left",
    text: "まあ、揺れてるな",
  },
  {
    speaker: "right",
    text: "うどん派のあなたは、どう責任を感じていますか？",
  },
  {
    speaker: "left",
    text: "…ねえと思ってるよ",
  },
  {
    speaker: "right",
    text: "無い？",
  },
  {
    speaker: "left",
    text: "なんにも関係ねえと思ってるよ",
  },
  {
    speaker: "right",
    text: "むしろ、蕎麦派だと？",
  },
  {
    speaker: "left",
    text: "蕎麦とか、うどんとか関係ねえじゃねえか！麺類は！人類の話だろ、それ。お前",
  },
  {
    speaker: "right",
    text: "じゃあ、こっから2択になります",
  },
  {
    speaker: "left",
    text: "ちょ、早くしてくんねえかな！？焼き立てのメロンパン売り切れんだろうが！早くしろよ、こら！",
  },
  {
    speaker: "right",
    text: "えー、外食と自炊では、自炊の方が多い",
  },
  {
    speaker: "left",
    text: "おお",
  },
  {
    speaker: "right",
    text: "YES or NO ?",
  },
  {
    speaker: "left",
    text: "ああ、家でご飯作るってことか。YESだ",
  },
  {
    speaker: "right",
    text: "YES？",
  },
  {
    speaker: "left",
    text: "うん",
  },
  {
    speaker: "right",
    text: "YESと答えた方にお聞きします",
  },
  {
    speaker: "left",
    text: "はい",
  },
  {
    speaker: "right",
    text: "豚肉、じゃがいも、人参、玉ねぎを煮込んでいます",
  },
  {
    speaker: "left",
    text: "うん",
  },
  {
    speaker: "right",
    text: "何ができますか？YES orカレー",
  },
  {
    speaker: "left",
    text: "カレーだわ。それ、カレーだろ、お前。何ができますか？YESっておかしいだろ！カレーかホワイトシチューだわ！",
  },
  {
    speaker: "right",
    text: "ちょっと何言ってるかわかんない",
  },
  {
    speaker: "left",
    text: "えー、よく死にたくなることがある？",
  },
  {
    speaker: "right",
    text: "何が聞きたいの？さっきから、お前",
  },
  {
    speaker: "left",
    text: "DEAD or ALIVE ？（キリッ）",
  },
  {
    speaker: "right",
    text: "やかましいわ！なんで良い声で言ったんだよ？",
  },
  {
    speaker: "left",
    text: "DEAD？",
  },
  {
    speaker: "right",
    text: "DEADじゃない、ALIVEだわ！ALIVE！お前！200歳まで生きてくんだ！バカタレが！",
  },
  {
    speaker: "righ",
    text: "女性がキレイになるなら整形してもいい？",
  },
  {
    speaker: "left",
    text: "うーん",
  },
  {
    speaker: "right",
    text: "YES！高須クリニック！",
  },
  {
    speaker: "left",
    text: "行くかんな、俺",
  },
  {
    speaker: "right",
    text: "ちょ、待ってください！",
  },
  {
    speaker: "left",
    text: "馬直じゃねえの！？",
  },
  {
    speaker: "right",
    text: "もう最後なんで！",
  },
  {
    speaker: "left",
    text: "関係ねえだろ！高須クリニック！",
  },
  {
    speaker: "right",
    text: "伊達ちゃん、もう最後なんで！",
  },
  {
    speaker: "left",
    text: "伊達ちゃんって言うな今！お前！",
  },
  {
    speaker: "left",
    text: "早くしろよ、じゃあ！",
  },
  {
    speaker: "right",
    text: "今の気持ちを誰に1番伝えたいですか？",
  },
  {
    speaker: "left",
    text: "お前だよ！もういいぜ！",
  },
  {
    speaker: "right",
    text: "どうも、あざした！",
  },
];

export default function GamePage() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        setCurrentDialogueIndex((prevIndex) => {
          if (prevIndex < scenario.length - 1) {
            return prevIndex + 1;
          }
          return prevIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const currentDialogue = scenario[currentDialogueIndex];

  return (
    <div className="game-page">
      <div className="stage-shell">
        <img
          src={bgImage}
          className="stage-background"
          alt="stage background"
        />

        <div className="game-content">
          <img src={boke} className="character boke" alt="boke" />
          <img src={tukkomi} className="character tukkomi" alt="tukkomi" />
          <img src={mic} className="character mic" alt="microphone" />

          <div className="dialog">
            <DialogueBoxRight
              text={
                currentDialogue.speaker === "right" ? currentDialogue.text : ""
              }
              className="right-dialogue"
            />

            <DialogueBoxLeft
              text={
                currentDialogue.speaker === "left" ? currentDialogue.text : ""
              }
              className="left-dialogue"
            />
          </div>

          <div className="choice-grid">
            <ChoiceButton text="A" />
            <ChoiceButton text="B" />
            <ChoiceButton text="C" />
            <ChoiceButton text="D" />
          </div>

          <div className="timing-display">
            <TimingBar />
          </div>

          <div className="audience-gauge">
            <AudienceGauge score={75} />
          </div>

          <Link to="/result" className="result-link">
            <button type="button">結果を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
