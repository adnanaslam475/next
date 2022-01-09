import React, { useEffect, useState } from "react";

function ChildComp({ id }) {
  console.log(id);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  console.log("ye", data.url);
  return (
    <div style={{ height: "600px" }}>
      <img src={data.url} alt="pic" />
    </div>
  );
}
export default ChildComp;
