import React, { Suspense } from "react"
const Channels = React.lazy(()=>import("../components/Channels"));

function Home() {
  return (
    <div>
      <h1>This is the Homepage</h1>
      <Suspense fallback="loading...">
      <Channels />
      </Suspense>
    </div>
  );
}

export default Home;
