// Use to set the stub of the HTML document title
// if no argument is provided, sets title to "Trustacks"
// e.g. setDocumentTitle("test") => "Trustacks | test"

// import React, { useEffect, useState } from "react";

const setDocumentTitle = (stub?: string ) => {
  //  might make this into a React hook with state and useEffect
  //  keeping it simple now

  // const [documentTitle, setDocumentTitle] = useState(
  //   `Trustacks${stub ? ` | ${stub}` : ""}`
  // );
  // useEffect(() => {
  //   document.title = documentTitle;
  //   console.log(documentTitle)
  // }, [documentTitle]);
  // return [documentTitle, setDocumentTitle];

  document.title = `Trustacks${stub ? ` | ${stub}` : ""}`
};

export {setDocumentTitle}