import { Github, Linkedin, Mail, Link } from "lucide-react";

function Footer() {
  return (
    <footer
      className={
        "flex justify-between items-center bg-popover shadow-sm w-full p-4 mb-3 mt-10 flex-col sm:flex-row gap-4"
      }
    >
      <span className={"text-md sm:text-lg "}>
        &#169; Taha Zoabi. All Rights Reserved.
      </span>
      <ul className={"flex gap-4"}>
        <li className={"hover:text-gray-500"}>
          <a target={"_blank"} href="https://github.com/TahaZoabi">
            <Github />
          </a>
        </li>
        <li className={"hover:text-gray-500"}>
          <a target={"_blank"} href="https://www.linkedin.com/in/tahazoabi/">
            <Linkedin />
          </a>
        </li>
        <li className={"hover:text-gray-500"}>
          <a href="mailto:range.dev7@gmail.com">
            <Mail />
          </a>
        </li>{" "}
        <li className={"hover:text-gray-500"}>
          <a href="https://tahazoabi.com" target={"_blank"}>
            <Link />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
