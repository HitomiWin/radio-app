import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
const Channels = React.lazy(() => import("../components/Channels"));

function Home() {
  return (
    <div>
      <h2 className="title">
        <span>Kanaler</span>
      </h2>
      <Suspense
        className="text-center"
        fallback={<Spinner animation="border" variant="secondary" />}
      >
        <Channels />
      </Suspense>
    </div>
  );
}

export default Home;
