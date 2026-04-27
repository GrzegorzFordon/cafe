import Unit from "./Unit";

function Units() {
  const figs = Array("1").map((v) => <Unit key={v} isEven={v % 2 == 0} />);

  return (
    <div className="absolute top-1/2 left-1/2 flex size-25 w-full -translate-1/2 justify-center">
      {figs}
    </div>
  );
}
export default Units;
