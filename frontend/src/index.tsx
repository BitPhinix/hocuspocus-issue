import { HocuspocusProvider } from "@hocuspocus/provider";
import React, { StrictMode, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import "../index.css";
import * as Y from "yjs";

function TestComponent() {
  const sharedType = useMemo(() => {
    const provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name: "test",
    });

    const type = provider.document.get(
      "xmlText",
      Y.XmlText
    ) as unknown as Y.XmlText;

    type.observeDeep((events, tx) => {
      console.log('type changed, inserted "a"', {
        delta: events.map((event) => event.delta),
        tx,
      });
    });

    return type;
  }, []);

  const handleClick = useCallback(() => {
    console.log("clicked");
    sharedType.insert(1, "a");
  }, [sharedType]);

  return (
    <button type="button" onClick={handleClick}>
      Click me
    </button>
  );
}

ReactDOM.render(
  <StrictMode>
    <TestComponent />
  </StrictMode>,
  document.getElementById("root")
);
