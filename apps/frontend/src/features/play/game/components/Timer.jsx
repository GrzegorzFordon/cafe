import sprite from "../assets/timer.png";

/**
 * Timer visual component
 */

function Timer() {
  return (
    <img
      className="absolute bottom-0 left-0 z-6 origin-center scale-80 select-none"
      src={sprite}
    />
  );
}
export default Timer;
