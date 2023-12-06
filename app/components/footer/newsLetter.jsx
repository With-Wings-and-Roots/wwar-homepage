"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const NewsLetter = ({ footerEn, footerDe }) => {
  const [footer, setFooter] = useState(footerEn);

  const language = useSelector((state) => state.entities.language.language);

  useEffect(() => {
    if (language === "de") {
      setFooter(footerDe);
    } else {
      setFooter(footerEn);
    }
  });

  return (
    <div className="pt-10">
      <div className="flex space-between gap-8 flex-wrap">
        <form
          action="https://fromherefilm.us2.list-manage.com/subscribe/post?u=40662e5abd8c9438fbcbc8c40&amp;id=0eeb9c281b"
          method="post"
          id="mc-embedded-subscribe-form"
          name={"mc-embedded-subscribe-form"}
          className="validate flex-grow"
          target="_blank"
          noValidate
        >
          <div
            id="mc_embed_signup_scroll"
            className="flex flex-wrap max-w-[600px]"
          >
            <label
              htmlFor="mce-EMAIL"
              className="w-full text-lg pb-2 font-extralight"
            >
              {footer.newsletter_title}
            </label>
            <input
              type="email"
              defaultValue=""
              name="EMAIL"
              className="email input-field flex-grow pr-2 pl-4 tracking-wider text-xl font-light text-wwr_rich_black focus:outline-none"
              id="mce-EMAIL"
              placeholder="email address"
              required
            />
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_40662e5abd8c9438fbcbc8c40_0eeb9c281b"
                tabIndex="-1"
                defaultValue=""
              />
            </div>
            <div className="clear">
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="cursor-pointer button px-3 uppercase text-xl bg-wwr_gray_storm h-12 tracking-wide hover:bg-wwr_outer_space duration-300"
              />
            </div>
          </div>
        </form>
        <div className="flex gap-4 items-end">
          {footer.socials.map((social, index) => {
            return (
              <a
                className="w-10 flex items-center justify-center hover:brightness-75 duration-300"
                href={social.url}
                key={index}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="pt-10 text-wwr_gray_storm flex flex-wrap gap-2">
        <div>
          {footer.copyright_text.replace("YEAR", new Date().getFullYear())}
        </div>
        <a
          href={footer.terms_page}
          className="hover:brightness-75 duration-300"
        >
          {language === "de" ? "Impressum" : "Terms and Conditions"}
        </a>
      </div>
    </div>
  );
};

export default NewsLetter;
