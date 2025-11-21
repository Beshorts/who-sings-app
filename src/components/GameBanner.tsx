import { useGenerateQuizCards } from "../hooks/gameHooks";
import type { QuizCard as QuizCardType } from "../types/quiz.types";

interface GameBannerProps {
  onStart: (generateCard: () => Promise<QuizCardType | null>) => void;
}

export function GameBanner({ onStart }: GameBannerProps) {
    
  const { generateCard } = useGenerateQuizCards();

  const handlePlayClick = () => {
    onStart(generateCard); // passa la funzione al parent
  };

  return (
    <div className="max-w-2xl mx-auto bg-rose-50 rounded-xl shadow-2xl p-6 md:p-10 text-center flex flex-col gap-y-5">
      {" "}
      <h1 className="text-2xl leading-7 font-black uppercase mb-3">
        {" "}
        Think you know the latest releases from our artists? Let’s find out!{" "}
      </h1>{" "}
      <h2 className="text-[20px] mb-3">
        {" "}
        Start the quiz game and get <strong>100 credits</strong> right away.{" "}
      </h2>{" "}
      <p className="text-[16px] mb-3 md:text-[18px]">
        {" "}
        The rules are simple: <strong>1 round, 3 cards</strong>.{" "}
      </p>{" "}
      <p className="text-[16px] mb-3 md:text-[18px]">
        {" "}
        You can play <strong>multiple rounds</strong> in the same game, only the{" "}
        <strong>best score</strong> will be keeped.{" "}
      </p>{" "}
      <p className="text-[16px] mb-3 md:text-[18px]">
        {" "}
        To pass the round you have to guess <strong>2 answers</strong>. Each
        card shows a lyric’s line from a song. You have{" "}
        <strong>10 seconds</strong> to figure out which artist it belongs to.
        You can <strong>refresh the lyric’s line</strong> but you will{" "}
        <strong>lose 1s</strong> each time. Answer l<strong>ess than 5s</strong>{" "}
        and you will <strong>win 3s</strong>, added to your remaining time.{" "}
      </p>{" "}
      <ul className="mx-auto text-[16px] md:text-[18px]">
        {" "}
        <li>
          {" "}
          <strong>First try correct?</strong>{" "}
        </li>{" "}
        <li>
          {" "}
          Earn <strong>50 credits</strong>{" "}
        </li>{" "}
        <li>
          {" "}
          <strong>Second try correct?</strong>{" "}
        </li>{" "}
        <li>
          {" "}
          Earn <strong>10 credits</strong>{" "}
        </li>{" "}
        <li>
          {" "}
          <strong>Wrong both times?</strong>{" "}
        </li>{" "}
        <li>
          {" "}
          Move to the next card <strong>losing 50 credits</strong>.{" "}
        </li>{" "}
        <li>
          {" "}
          If your <strong>credits hit 0</strong>, the <strong>game ends</strong>{" "}
          .{" "}
        </li>{" "}
      </ul>{" "}
      <button
        type="button"
        className="w-30 cursor-pointer mx-auto text-[16px] text-white font-bold rounded-4xl bg-primary-700 uppercase p-2 mt-6 hover:bg-primary-300"
        onClick={handlePlayClick}
      >
        {" "}
        play{" "}
      </button>{" "}
    </div>
  );
}
