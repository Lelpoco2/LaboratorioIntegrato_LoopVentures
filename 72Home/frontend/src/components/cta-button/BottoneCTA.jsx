import "./BottoneCTA.css"
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function BottoneCTA() {
    return (
        <>
            <button className="button">
                Get in touch <ArrowRightIcon size={20} weight="bold" className="right-arrow" />
            </button>
        </>
    );
}