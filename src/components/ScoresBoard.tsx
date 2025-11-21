type OtherPlayers = {
  name: string;
  bestScore: number;
}

type CurrentPlayer = {
  round: number;
  bestScore: number
}

type ScoresBoardProps<T> = {
  color: string;
  title: string;
  whoPlays: T[];
};

 /** helper func using TS type narrowing "name" in item
   * to check if item belongs to OtherPlayers by verifying if "name" exist
   * otherwise render Round infos of current player
   */
function itemHelper(item: OtherPlayers | CurrentPlayer) {
  if ('name' in item) {
    return ` ${item.name} - credits ${item.bestScore}`;
  } else {
    return `Round ${item.round} - credits ${item.bestScore}`;
  }
}

export function ScoresBoard<T extends OtherPlayers | CurrentPlayer>({
  color,
  title,
  whoPlays,
}: ScoresBoardProps<T>) {

  return (
    <div className={`max-w-[250px] bg-${color}-100 rounded-2xl p-6`}>
      <p className="uppercase font-bold">{title}</p>
      {whoPlays.map((item,index) => (
        <p key={index} className="capitalize font bold">
          {
            itemHelper(item)
          }
        </p>
      ))
      }
    </div>
  );
}
