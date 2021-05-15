import React from "react";
import FacebookIcon from "../../../../static/icons/facebook.svg";
import InstagramIcon from "../../../../static/icons/instagram.svg";
import TwitterIcon from "../../../../static/icons/twitter.svg";
import PinterestIcon from "../../../../static/icons/pinterest.svg";
import styles from "./SocialLinks.scss";

const SOCIAL_LINKS = [
  { url: "http://facebook.com", icon: <FacebookIcon /> },
  { url: "http://instagram.com", icon: <InstagramIcon /> },
  { url: "http://twitter.com", icon: <TwitterIcon /> },
  { url: "http://pinterest.com", icon: <PinterestIcon /> }
];

export const SocialLinks = ({ animate, animateFromTop, iconsClassName, containerClassName }) => {
  return (
    <div className={containerClassName || styles.links_wrapper}>
      {SOCIAL_LINKS.map((link, i) => (
        <a href={link.url} key={i}>
          <div
            style={
              animate ? { animationDelay: `${200 * (i + 1) + (animateFromTop ? 500 : 0)}ms` } : {}
            }
            className={
              iconsClassName ||
              styles[`link${animate ? (animateFromTop ? "_from_top" : "_from_bottom") : ""}`]
            }
          >
            {link.icon}
          </div>
        </a>
      ))}
    </div>
  );
};
