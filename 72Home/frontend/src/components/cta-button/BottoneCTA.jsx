import "./BottoneCTA.css";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function BottoneCTA() {
  return (
    <>
      <Link to="/evaluation">
        <button className="button">
          Valuta ora{" "}
          <ArrowRightIcon size={20} weight="bold" className="right-arrow" />
        </button>
      </Link>
    </>
  );
}
