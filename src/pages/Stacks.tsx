import React from "react";
import { Segment } from "semantic-ui-react";

import { ReactComponent as StacksIcon } from "../assets/stacked-files.svg";

type StackSegmentProps = {
  name: string,
  type: string
}

function StackSegment (props: StackSegmentProps) {
  const {name, type} = props

  return (
    <Segment>
      <StacksIcon className="grey-icon" style={{width: "20px", height: "20px"}} />
      {name}
      <span style={{color: "#9B7FFF"}}>
        {type}
      </span>
    </Segment>
  )
}

export default function Stacks () {
  return (
    <Segment.Group>
      <StackSegment name="Stack A" type="Kubernetes"/>
    </Segment.Group>
  )
}