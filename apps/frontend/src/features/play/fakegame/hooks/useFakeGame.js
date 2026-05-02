import useFakeGameStore from "../stores/useFakeGameStore";
import FakeGameModel from "../fakegame/game.model.fake";
import FakeAction from "../fakegame/action.fake";
import { useCallback, useEffect, useRef, useState } from "react";
import { eventEmitter } from "../../../../util/eventEmitter";

const useFakeGame = () => {
  const fakeGameController = useFakeGameStore(
    (state) => state.fakeGameController,
  );

  /**
   * EFFECTS (catching the sim outputs)
   */

  const effects = useRef([]);

  const handleSimEffect = useCallback((e) => {
    console.log("handlesimeffect", e);
    effects.current.push(e);
  }, []);

  useEffect(() => {
    eventEmitter.on("sim:effect", handleSimEffect);
    return () => eventEmitter.off("sim:effect", handleSimEffect);
  }, [handleSimEffect]);






  /**
   * ACTIONS (sim inputs)
   */

  const addAction = useFakeGameStore((state) => state.addAction);
  const actions = useFakeGameStore((state) => state.actions);
  const getNextAction = useFakeGameStore((state) => state.getNextAction);

  //push Actions
  const addFakeAction = () => {
    const newaction = new FakeAction(Math.round(Math.random() * 100));
    addAction(newaction);
  };

  //process Actions
  const processActions = async () => {
    while (actions.length > 0) {
      const nextAction = getNextAction();
      if (!nextAction) break;
      fakeGameController.handleAction(nextAction);
    }
    await processEffects();
  };





  /**
   * OBSERVERS
   */
  const [observers, setObservers] = useState([]);

  const notifyObserversOfGameEffects = async (effect) => {
    await Promise.all(observers.map((o) => o(effect)));
  };

  const subscribeToGameEffects = (newSub) => {
    setObservers([...observers, newSub]);
  };
  const unsubscribeToGameEffects = (newSub) => {
    setObservers(observers.filter((val) => val != newSub));
  };




  const processEffects = async () => {
    while (effects.current.length > 0) {
      console.log("effects left", effects.current.length);
      const nextEffect = effects.current.shift();
      await notifyObserversOfGameEffects(nextEffect);
    }

    console.log("TIME TO ADVANCE GAME");
  };




  

  return {
    addAdditionEvent: addFakeAction,
    processActions,
    actions,
    subscribeToGameEffects,
    unsubscribeToGameEffects,
  };
};

export default useFakeGame;
