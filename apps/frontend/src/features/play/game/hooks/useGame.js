import useGameStore from "../../../../stores/useGameStore";
import { useEffect } from "react";
import { eventEmitter } from "../../../../util/eventEmitter";
const useGame = () => {
  const gameController = useGameStore((state) => state.gameController);

  // const sendActions = useSocket();
  const handleSideEffect = (e) => console.log("Unit Spawned", e);

  useEffect(() => {
    eventEmitter.on("unit:spawn", handleSideEffect);
    return () => eventEmitter.off("unit:spawn", handleSideEffect);
  }, []);

  const startGame = () => {
    gameController.start();
  };

  const submitActions = () => {
    // sendActions(actions);
    // resetActions();
  };

  return {
    startGame,
    submitActions,
  };
};

export default useGame;
