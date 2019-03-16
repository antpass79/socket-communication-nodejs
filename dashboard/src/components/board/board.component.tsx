import React from 'react';

import './board.component.css';
import { Program } from '../program/program.component';
import { Settings } from '../settings/settings.component';
import { Graph } from '../graph/graph.component';

type props = {
  squares?: number[],
  onClick?: any
};
export class Board extends React.Component<props> {

  renderProgram() {

    return <Program />;
  }

  renderSettings() {

    return <Settings />;
  }

  renderGraph() {

    return <Graph />;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row row-up">
          <div className="program">{this.renderProgram()}</div>
          <div  className="settings">{this.renderSettings()}</div>
        </div>
        <div className="board-row">
          {this.renderGraph()}
        </div>
      </div>
    );
  }
}
