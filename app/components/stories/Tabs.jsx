import SingleTabButton from "./SingleTabButton";
import tabData from "../../data/Stories/tabData.json";

const Tabs = () => {
  return (
    <div className="flex flex-wrap gap-0.5">
      {tabData.map((singleTabData) => (
        <SingleTabButton>{singleTabData.toString()}</SingleTabButton>
      ))}
      <div className="text-xl text-wwr_yellow_orange flex items-center p-2">
        Stories: 13
      </div>
    </div>
  );
};

export default Tabs;
