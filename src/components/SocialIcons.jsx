import {
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";

import HoverLinks from "./HoverLinks";

import "./styles/SocialIcons.css";

const SocialIcons = () => {
    return (
        <div className="icons-section">
            <div className="social-icons" data-cursor="icons" id="social">
                <span>
                    <a href="https://github.com/nishika25-ta" target="_blank">
                        <FaGithub />
                    </a>
                </span>
            </div>
        </div>
    );
};

export default SocialIcons;
