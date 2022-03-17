import "./feature.scss";
import Card from "./../Card/Card";
import SkeletonCard from "./../../skeletons/SkeletonCard/SkeletonCard";

function Feature({ list }) {
    const renderListItem = (list) => {
        let xhtml = [];
        xhtml = list.map((book) => {
            return (
                <div className="col-6 col-sm-3 product-list-item">
                    <Card item={book} />
                </div>
            );
        });

        return xhtml;
    };
    const renderListItemSkeleton = () => {
        let array = Array(8);
        array.fill(0);
        return array.map((ele) => {
            return (
                <div className="col-6 col-sm-3 product-list-item">
                    <SkeletonCard />
                </div>
            );
        });
    };
    return (
        <div className="products-list">
            <div className="row">
                {list.length ? renderListItem(list) : null}
                {list.length === 0 ? renderListItemSkeleton() : null}
            </div>
        </div>
    );
}

export default Feature;
