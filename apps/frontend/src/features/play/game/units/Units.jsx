import Unit from "./Unit";

function Units() {
  // const figs = Array("1").map((v) => <Unit key={v} isEven={v % 2 == 0} />);

  return (
    // <div className="absolute top-1/2 left-1/2 flex size-25 w-full -translate-1/2 justify-center">
    <div className="UNITS absolute top-1/2 left-1/2 -translate-1/2 bg-green-500">
      <Unit key={1} unitID={1} />
    </div>
  );
}
export default Units;
