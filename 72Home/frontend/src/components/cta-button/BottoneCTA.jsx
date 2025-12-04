import "./BottoneCTA.css";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function BottoneCTA({ address = "" }) {
  return (
    <>
      <Link to="/evaluation" state={{ initialAddress: address }}>
        <button className="button">
          Valuta ora{" "}
          <ArrowRightIcon size={20} weight="bold" className="right-arrow" />
        </button>
      </Link>
    </>
  );
}
