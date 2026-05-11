import useSocketStore from "../../../../stores/useSocketStore.js";
import useSocket from "../../../socket/hooks/useSocket.js";
import useGameStore from "../stores/useGameStore";
import EventBus from "../util/eventBus.js";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const actions = useGameStore((state) => state.actions);
  const resetActions = useGameStore((state) => state.resetActions);
  const roomData = useSocketStore((state) => state.roomData);

  const { sendActions } = useSocket();
  const startGame = () => {
    // EventBus.connect();
    // gameController.start();
  };

  // const finishGame = () => {
  //   EventBus.disconnect();
  //   // gameController
  // };

  const advanceGame = () => {
    gameController.advance();
  };

  const submitActions = () => {
    sendActions({ roomID: roomData.id, actions: actions });
    // local version has actions stored already so we send them to the sim immediately for now
    // console.log("[Hook] Submitting");
    // gameController.handleActions(actions);
    resetActions();
  };

  return {
    startGame,
    advanceGame,
    // finishGame,
    submitActions,
  };
};

export default useGame;
