'use client';
import PuffLoader from "react-spinners/PuffLoader";

const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "15rem"
};

function LoadingSpinner({ loading }) {

    return (
        <div className="sweet-loading">
            <PuffLoader
                color={"#ffffff"}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default LoadingSpinner;