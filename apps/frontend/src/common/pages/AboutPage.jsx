import image from "../../assets/team.png";
import FramedHero from "./HeroBios/FramedHero";

function About() {
  return (
    <div className="size-full">
      //{" "}
      <img
        className="absolute top-1/2 left-1/2 -translate-1/2"
        src={image}
        width={"60%"}
      />
      <FramedHero />
    </div>
  );
}
export default About;
