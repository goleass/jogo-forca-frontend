import React from "react";

import { useCount } from "../../context/Count";

export default function Mirror() {
  const { count } = useCount();

  return (
    <span>
      <b>Mirrdddsor: {count}</b>
    </span>
  );
}