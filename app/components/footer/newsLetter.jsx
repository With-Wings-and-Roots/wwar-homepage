import React from "react";

const NewsLetter = () => {
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
        <div id="mc_embed_signup_scroll">
          <label htmlFor="mce-EMAIL">Subscribe</label>
          <input
            type="email"
            defaultValue=""
            name="EMAIL"
            className="email input-field"
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
              className="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsLetter;
