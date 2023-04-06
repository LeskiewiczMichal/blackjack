import { PlayerState } from "types.d";

type CheckPlayerScoreProps = {
    player: PlayerState,
}

export function playerOverTwentyOne(props: CheckPlayerScoreProps) {
    const { player } = props;
    if (player.score > 21) {
        return true;
    }
    return false;
}