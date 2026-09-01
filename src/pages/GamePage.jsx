import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/images/stage1.png";
import tukkomi from "../assets/images/tukkomi.png";
import tukkomi2 from "../assets/images/tukkomi2.png";
import boke from "../assets/images/boke.png";
import boke2 from "../assets/images/boke2.png";
import mic from "../assets/images/mic.png";
import Audience1 from "../assets/images/audience1.png";
import Audience2 from "../assets/images/audience2.png";
import Audience3 from "../assets/images/audience3.png";
import { DialogueBoxLeft } from "../components/DialogueBoxLeft";
import { DialogueBoxRight } from "../components/DialogueBoxRight";
import { ChoiceButton } from "../components/ChoiceButton";
import { AudienceGauge } from "../components/AudienceGauge";
import { TimingBar } from "../components/TimingBar";
import {
  addAudienceScore,
  canAdvanceDialogue,
  getAudienceGaugeProgress,
  getAudienceReactionState,
  resolveRound,
} from "../gameLogic";
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
    text: "まあ、世の中興奮 \nすることっていっぱいあるけど",
  },
  {
    speaker: "left",
    text: "うん",
  },
  {
    speaker: "right",
    text: "1番興奮するのは、\n街頭アンケートな！",
  },
  {
    speaker: "right",
    text: "あのー、ダイエット中すみません",
  },
  {
    speaker: "left",
    text: "...",
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "してねえよ別に！", "い", "う"],
      correctAnswer: "してねえよ別に！",
    },
  },
  {
    speaker: "left",
    text: "ただ歩いてるだけじゃねえか！ \nなんだお前",
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
    text: "いや、あの、渋谷で10代の女性 \nを中心に聞いてるんですけど",
  },
  {
    speaker: "left",
    text: "...", //2
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "1個も当てはまってねえよ！", "い", "う"],
      correctAnswer: "1個も当てはまってねえよ！",
    },
  },
  {
    speaker: "left",
    text: "六本木で俺30代だからさ！ \n渋谷行け、渋谷！",
  },
  {
    speaker: "right",
    text: "まあ、誰でもいいんです",
  },
  {
    speaker: "left",
    text: "誰でもいいのかよ！ \nどういうことだよ",
  },
  {
    speaker: "right",
    text: "もし、問題あるようでしたら \n音声も変えますし",
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
    text: "...", //3
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "モザイクね！", "い", "う"],
      correctAnswer: "モザイクね！",
    },
  },
  {
    speaker: "right",
    text: "モザイク",
  },
  {
    speaker: "left",
    text: "なんでお前、\n目に材木はめ込んでこうやって \nアンケート答えてんだよ？",
  },
  {
    speaker: "left",
    text: "カメラもねえしよ、別に",
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
    text: "すぐ終わんのね？ \nじゃあ、早くしてくれよ",
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
    text: "このアンケートを \n何で知りましたか？",
  },
  {
    speaker: "left",
    text: "...", //4
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "お前だよ！", "い", "う"],
      correctAnswer: "お前だよ！",
    },
  },
  {
    speaker: "left",
    text: "お前から聞いたわ！",
  },
  {
    speaker: "left",
    text: "お前って書いとけ！お前！",
  },
  {
    speaker: "right",
    text: "あの、\nお名前聞いてもよろしいですか？",
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
    text: "苗字だよ！",
  },
  {
    speaker: "left",
    text: "どこの世界に佐藤伊達 \nとかがいるんだよ？",
  },
  {
    speaker: "left",
    text: "...", //5
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "テニスのペアか？俺は", "い", "う"],
      correctAnswer: "テニスのペアか？俺は",
    },
  },
  {
    speaker: "left",
    text: "伊達みきおっつーんだよ！",
  },
  {
    speaker: "right",
    text: "あなたは何か、\nニックネームはありますか？",
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
    text: "あんまないけど、まあ、\n伊達ちゃんとか言われるかな",
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
    text: "誰がおデブちゃんだ！？ \n言われるか！",
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
    text: "A、A型。\nB、O型。\nC、B型。\nD、AB型。",
  },
  {
    speaker: "left",
    text: "ややこしいわ、お前！", //6
  },
  {
    speaker: "left",
    text: "なんだ、その聞き方！？ \nお前！Bだ、B！",
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
    text: "そうやって答えんだろ、これ！",
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
    text: "えー、1人暮らしですか？",
  },
  {
    speaker: "right",
    text: "それとも、その日暮らしですか？",
  },
  {
    speaker: "left",
    text: "...", //7
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "何が聞きてえんだよ！？", "い", "う"],
      correctAnswer: "何が聞きてえんだよ！？",
    },
  },
  {
    speaker: "left",
    text: "なんだ、その日暮らしって、お前。実家に住んでんだ！",
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
    text: "あ、すみません。",
  },
  {
    speaker: "right",
    text: "そのうち、\n杯を交わしている兄弟は \n何人ですか？",
  },
  {
    speaker: "left",
    text: "そんな兄弟いねえわ！ \nみんな、血の繋がった俺の兄弟だわ！",
  },
  {
    speaker: "right",
    text: "繋がった兄弟…っと",
  },
  {
    speaker: "left",
    text: "繋がった兄弟ってなんだよ！",
  },
  {
    speaker: "left",
    text: "ぴんから兄弟みたいに \nなってんじゃねえか！",
  },
  {
    speaker: "left",
    text: "…なってねえよ！ \n全然なってねえわ！",
  },
  {
    speaker: "right",
    text: "お仕事は、\n何力団をされてるんですか？",
  },
  {
    speaker: "left",
    text: "暴力団限定だろ、それよ！ \nふざけてんのかお前、さっきから！",
  },
  {
    speaker: "left",
    text: "俺は、\nお前のアンケートに協力して \nんだからな、協力団だよ！",
  },
  {
    speaker: "right",
    text: "協力団ってなんですか？",
  },
  {
    speaker: "left",
    text: "協力団って書いとけ！\n…会社員。会社員だよ",
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
    text: "えー、会社員ということで、",
  },
  {
    speaker: "right",
    text: "いろんな派閥があると思われますが",
  },
  {
    speaker: "left",
    text: "まあ、いくつかあるけどね",
  },
  {
    speaker: "right",
    text: "あなたは、うどん派ですか？ \n蕎麦派ですか？",
  },
  {
    speaker: "left",
    text: "そんな派閥ねえわ！ \nおい、なんだ、\nそのちっぽけ会社は",
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
    text: "蕎麦派に寝返る可能性って \nどれくらいありますか？",
  },
  {
    speaker: "left",
    text: "結構あるよ？ \n今日の昼飯、ざる蕎麦 \n食ってるからね",
  },
  {
    speaker: "right",
    text: "えーでは、",
  },
  {
    speaker: "right",
    text: "中東和平問題で揺れる \n世界情勢ですが",
  },
  {
    speaker: "left",
    text: "まあ、揺れてるな",
  },
  {
    speaker: "right",
    text: "うどん派のあなたは、\nどう責任を感じていますか？",
  },
  {
    speaker: "left",
    text: "...", //8
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "...ねえと思ってるよ", "い", "う"],
      correctAnswer: "...ねえと思ってるよ",
    },
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
    text: "蕎麦とか、うどんとか \n関係ねえじゃねえか！",
  },
  {
    speaker: "left",
    text: "麺類は！ \n人類の話だろ、それ。お前!",
  },
  {
    speaker: "right",
    text: "じゃあ、こっから2択になります",
  },
  {
    speaker: "left",
    text: "ちょ、早くしてくんねえかな！？",
  },
  {
    speaker: "left",
    text: "焼き立てのメロンパン \n売り切れんだろうが！ \n早くしろよ、こら！",
  },
  {
    speaker: "right",
    text: "えー、外食と自炊では、\n自炊の方が多い",
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
    text: "ああ、家でご飯作るってことか。\nYESだ",
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
    text: "豚肉、じゃがいも、人参、\n玉ねぎを煮込んでいます",
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
    text: "...", //9
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "YES", "い", "カレー"],
      correctAnswer: "カレー",
    },
  },
  {
    speaker: "left",
    text: "YESっておかしいだろ！ \nカレーかホワイトシチューだわ！",
  },
  {
    speaker: "right",
    text: "ちょっと何言ってるかわかんない",
  },
  {
    speaker: "right",
    text: "えー、よく死にたくなることがある？",
  },
  {
    speaker: "left",
    text: "何が聞きたいの？さっきから、お前",
  },
  {
    speaker: "right",
    text: "DEAD or ALIVE ？（キリッ）",
  },
  {
    speaker: "left",
    text: "やかましいわ！なんで良い声で言ったんだよ？",
  },
  {
    speaker: "right",
    text: "DEAD？",
  },
  {
    speaker: "left",
    text: "DEADじゃない、ALIVEだわ！",
  },
  {
    speaker: "left",
    text: "ALIVE！お前！ \n200歳まで生きてくんだ！ \nバカタレが！",
  },
  {
    speaker: "right",
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
    text: "今の気持ちを \n誰に1番伝えたいですか？",
  },
  {
    speaker: "left",
    text: "...", //10
    showChoiceUi: true,
    answerMode: "timing",
    quiz: {
      options: ["あ", "お前だよ！", "い", "う"],
      correctAnswer: "お前だよ！",
    },
  },
  {
    speaker: "left",
    text: "もういいぜ！",
  },
  {
    speaker: "right",
    text: "どうも、あざした！",
  },
];

export default function GamePage() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTimingActive, setIsTimingActive] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [timingScore, setTimingScore] = useState(0);
  const [audienceScore, setAudienceScore] = useState(0);
  const [isWrongAnswerEffectActive, setIsWrongAnswerEffectActive] =
    useState(false);

  const totalProblems = scenario.filter(
    (dialogue) => dialogue.showChoiceUi,
  ).length;
  const currentDialogue = scenario[currentDialogueIndex];

  useEffect(() => {
    if (!isWrongAnswerEffectActive) {
      return;
    }

    const timer = setTimeout(() => {
      setIsWrongAnswerEffectActive(false);
      setSelectedAnswer(null);
      setCurrentDialogueIndex((prevIndex) =>
        prevIndex < scenario.length - 1 ? prevIndex + 1 : prevIndex,
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, [isWrongAnswerEffectActive]);

  const handleAdvanceDialogue = () => {
    const shouldRequireAnswer = currentDialogue?.showChoiceUi === true;
    const advanceAllowed = canAdvanceDialogue({
      showChoiceUi: shouldRequireAnswer,
      selectedAnswer,
      isTimingActive,
    });

    if (!advanceAllowed) {
      return;
    }

    if (shouldRequireAnswer) {
      setSelectedAnswer(null);
      setIsTimingActive(false);
    }

    setCurrentDialogueIndex((prevIndex) => {
      if (prevIndex < scenario.length - 1) {
        return prevIndex + 1;
      }

      return prevIndex;
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key !== "Enter") {
        return;
      }

      handleAdvanceDialogue();
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentDialogueIndex, selectedAnswer, isTimingActive, currentDialogue]);

  const correctAnswer = "B";
  const currentQuiz = currentDialogue?.quiz;
  const answerMode = currentDialogue?.answerMode ?? "timing";
  const expectedCorrectAnswer = currentQuiz?.correctAnswer ?? correctAnswer;

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answerMode === "advance") {
      if (answer !== currentQuiz.correctAnswer) {
        setIsWrongAnswerEffectActive(true);
        setTimingScore(0);
        setFinalScore(0);
        setIsTimingActive(false);
        return;
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        setCurrentDialogueIndex((prevIndex) =>
          prevIndex < scenario.length - 1 ? prevIndex + 1 : prevIndex,
        );
      }, 300);
      return;
    }

    if (answer !== expectedCorrectAnswer) {
      setIsWrongAnswerEffectActive(true);
      setTimingScore(0);
      setFinalScore(0);
      setIsTimingActive(false);
      return;
    }

    setIsTimingActive(true);
  };

  const handleTimingFinish = ({
    timingScore: nextTimingScore,
    currentPosition,
    targetPosition,
  }) => {
    const result = resolveRound({
      selectedAnswer,
      correctAnswer: expectedCorrectAnswer,
      currentPosition,
      targetPosition,
    });

    setTimingScore(result.timingScore);
    setFinalScore(result.finalScore);
    setIsTimingActive(false);

    if (result.isCorrect) {
      setAudienceScore((prevScore) =>
        addAudienceScore({
          currentScore: prevScore,
          gainedScore: result.finalScore,
          totalProblems,
        }),
      );
      setTimingScore(nextTimingScore);
      setFinalScore(nextTimingScore);
      setSelectedAnswer(null);
      setCurrentDialogueIndex((prevIndex) =>
        prevIndex < scenario.length - 1 ? prevIndex + 1 : prevIndex,
      );
      return;
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentDialogueIndex((prevIndex) =>
        prevIndex < scenario.length - 1 ? prevIndex + 1 : prevIndex,
      );
    }, 500);
  };

  const showChoiceUi = currentDialogue?.showChoiceUi === true;
  const audienceGaugeScore = getAudienceGaugeProgress({
    totalScore: audienceScore,
    totalProblems,
  });
  const audienceReaction = getAudienceReactionState(audienceGaugeScore);
  const audienceClassName = audienceReaction.isLaughing
    ? `audience audience-laugh audience-laugh-${audienceReaction.intensity}`
    : "audience";

  return (
    <div className="game-page">
      <div className="stage-shell">
        <img
          src={bgImage}
          className="stage-background"
          alt="stage background"
        />

        <div className="game-content">
          <img
            src={isWrongAnswerEffectActive ? boke2 : boke}
            className="character boke"
            alt="boke"
          />
          <img
            src={isWrongAnswerEffectActive ? tukkomi2 : tukkomi}
            className="character tukkomi"
            alt="tukkomi"
          />
          <img src={mic} className="character mic" alt="microphone" />

          <div className="dialog" onClick={handleAdvanceDialogue}>
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

          <div className={audienceClassName}>
            <img src={Audience1} alt="audience 1" />
            <img src={Audience2} alt="audience 2" />
            <img src={Audience3} alt="audience 3" />
          </div>

          {showChoiceUi && (
            <>
              <div className="choice-grid">
                {(currentQuiz?.options ?? ["A", "B", "C", "D"]).map(
                  (option) => (
                    <ChoiceButton
                      key={option}
                      text={option}
                      disabled={Boolean(selectedAnswer)}
                      onClick={() => handleAnswerClick(option)}
                    />
                  ),
                )}
              </div>

              <div className="timing-display">
                <TimingBar
                  isActive={isTimingActive}
                  onFinish={handleTimingFinish}
                />
              </div>
            </>
          )}

          <div className="audience-gauge">
            <AudienceGauge score={audienceGaugeScore} />
          </div>

          {selectedAnswer && (
            <div className="result-link" style={{ right: "3%", bottom: "12%" }}>
              <strong>
                {selectedAnswer === expectedCorrectAnswer
                  ? `正解！ ${finalScore}点`
                  : "不正解"}
              </strong>
            </div>
          )}

          <Link to="/result" className="result-link">
            <button type="button">結果を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
