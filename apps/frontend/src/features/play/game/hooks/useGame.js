import GameController from "@cafe/engine/game/game.controller.js";
import useSocketStore from "../../../../stores/useSocketStore.js";
import useSocket from "../../../socket/hooks/useSocket.js";
import useGameStore from "../stores/useGameStore.js";
import EventBus from "../util/eventBus.js";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);
  const setGameController = useGameStore((state) => state.setGameController);
  const actions = useGameStore((state) => state.actions);
  // const resetActions = useGameStore((state) => state.resetActions);
  const roomData = useSocketStore((state) => state.roomData);

  const { sendActions } = useSocket();
  const startGame = (e) => {
    console.log("starting game");
    const gameController = new GameController({ players: e });
    EventBus.connectToSim(gameController.eventEmitter);
    setGameController(gameController);
    gameController.start();
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
    // resetActions();
  };

  const processActions = (actions) => {
    gameController.handleActions(actions);
  };

  


  return {
    startGame,
    advanceGame,
    // finishGame,
    submitActions,
    processActions,
  };
};

export default useGame;
