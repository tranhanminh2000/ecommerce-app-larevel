import React from "react";
import "./dropdownMenu.scss";

function DropdownMenu({ title, id, list, click }) {
    const renderListItem = (list) => {

        return list.map((listItem) => {
            return (
                <li>
                    <div
                        class="dropdown-item"
                        onClick={() =>
                            click(listItem.title, listItem.by, listItem.value)
                        }
                    >
                        {listItem.title}
                    </div>
                </li>
            );
        });

    };

    return (
        <>
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id={id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {title}
                </button>
                <ul class="dropdown-menu" aria-labelledby={id}>
                    {renderListItem(list)}
                </ul>
            </div>
        </>
    );
}

export default DropdownMenu;
