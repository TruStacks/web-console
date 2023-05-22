import React from "react";
import { Breadcrumb, Button } from "semantic-ui-react";

export function BreadcrumbSubHeader() {
  // const pathname = document.location.pathname.match(/[^\/]+/);

  return (
    <Breadcrumb>
      <Breadcrumb.Section>
        <Button
          circular
          compact
          icon="home"
          style={{ backgroundColor: "#9B7FFF", color: "white" }}
        />
      </Breadcrumb.Section>
      <Breadcrumb.Divider style={{ margin: "0 8px" }} />
      <Breadcrumb.Section>Applications</Breadcrumb.Section>

      {/* todo: split url path into breadcrumbs */}

      {/* {pathname &&
        pathname.length > 0 &&
        pathname?.map((p) => (
          <Breadcrumb.Divider style={{ margin: "0 8px" }} />
            <Breadcrumb.Section>{p}</Breadcrumb.Section>
        ))} */}
    </Breadcrumb>
  );
}
