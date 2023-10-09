"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

const SocialShareIcons = ({ url = "https://wwar.backslashseven.com/" }) => {
  if (typeof window !== "undefined") url = window.location.href;

  return (
    <div className="flex gap-1">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <RedditShareButton url={"url"}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={"url"}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={"url"}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShareIcons;
