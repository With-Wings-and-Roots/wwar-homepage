import React from "react";
import { useSelector } from "react-redux";

const NewsLetter = () => {
  const language = useSelector((state) => state.entities.language.language);
  return (
    <div>
      <form
        action="https://fromherefilm.us2.list-manage.com/subscribe/post?u=40662e5abd8c9438fbcbc8c40&amp;id=0eeb9c281b"
        method="post"
        id="mc-embedded-subscribe-form"
        name={"mc-embedded-subscribe-form"}
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll" className="flex flex-wrap md:w-1/2">
          <label htmlFor="mce-EMAIL" className="w-full text-lg pb-2 font-light">
            {language === "de"
              ? "Anmeldung zum Newsletter "
              : "Subscribe to our newsletter to stay up to date: "}
          </label>
          <input
            type="email"
            defaultValue=""
            name="EMAIL"
            className="email input-field flex-grow pr-2 pl-4 tracking-wider text-xl font-light"
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
              className="button px-3 tracking-normal uppercase text-xl bg-wwr_gray_storm h-12"
            />
          </div>
        </div>
      </form>
      <div className="pt-10 text-wwr_gray_storm flex flex-wrap gap-2">
        <div>Copyright 2023 With Wings & Roots. All rights reserved.</div>
        <a href="/">
          {language === "de" ? "Impressum" : "Terms and Conditions"}
        </a>
      </div>
    </div>
  );
};

export default NewsLetter;
