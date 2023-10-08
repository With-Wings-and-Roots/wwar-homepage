import Link from "next/link";

const SingleTabButton = ({
  buttonText = "",
  slug,
  selectedTopic = "All Stories",
  lang = "en",
}) => {
  return (
    <Link
      href={
        slug === "all"
          ? `/${lang}/stories`
          : "/" + lang + "/stories/topic/" + slug
      }
    >
      <div
        className={`${
          selectedTopic === slug
            ? "bg-wwr_rich_black text-wwr_yellow_orange"
            : "bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered text-wwr_rich_black hover:bg-wwr_yellow_orange_hovered hover:text-wwr_white"
        } text-xl w-max p-3  hover:cursor-pointer transition-all duration-300`}
      >
        {buttonText}
      </div>
    </Link>
  );
};

export default SingleTabButton;
