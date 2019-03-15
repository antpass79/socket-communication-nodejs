import React from 'react';
import { Canvas } from './canvas/canvas.component';

import './graph.component.css';

type props = {
  squares?: number[],
  onClick?: any
};
type state = {
  value: number
};
export class Graph extends React.Component<props, state> {

  renderGraph() {
    return <Canvas></Canvas>;
  }

  render() {
    return (
      <div className="graph">
        {this.renderGraph()}
      </div>
    );
  }
}
