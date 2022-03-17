import classNames from "classnames";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "./accordion.scss";

function Accordion({ content, handleFilter }) {
    const shopProduct = useSelector((state) => state.shopProduct);
    const convertNumberToStar = (number = 1) => {
        let listStar = [];

        for (let i = 0; i < number; i++) {
            listStar.push(
                <span>
                    <AiFillStar />
                </span>
            );
        }
        return listStar;
    };

    const renderAccordionListItem = (list) => {
        let xhtml = [];
        xhtml = list.map((listItem) => {
            return (
                <li
                    className={classNames("accordion-list-item", {
                        active: shopProduct.filter[content.title]?.value === listItem,
                    })}
                    onClick={() =>
                        handleFilter(content.title, content.field, listItem)
                    }
                >
                    {content.title === "rating"
                        ? convertNumberToStar(listItem)
                        : listItem}
                </li>
            );
        });
        return xhtml;
    };

    return (
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${content.title}`}
                        aria-expanded="false"
                        aria-controls={`${content.title}`}
                    >
                        {content.title}
                    </button>
                </h2>
                <div
                    id={`${content.title}`}
                    class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingOne"
                >
                    <div class="accordion-body">
                        <ul className="accordion-list">
                            {renderAccordionListItem(content.list)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accordion;
