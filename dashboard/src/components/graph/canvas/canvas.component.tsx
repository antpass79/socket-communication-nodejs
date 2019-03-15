import React, { RefObject } from 'react';
import { Stage, Layer, Star } from 'react-konva';
import { IShape } from '../../../models/IShape';

import './canvas.component.scss';
import { IAmHere, ReadSide, WriteSide, Link, Database } from '../shapes/images.component';

type props = {
  shapes?: IShape[],
};
export class Canvas extends React.Component<props> {

  private stageRef: RefObject<Stage>;

  private IAmHereRef: RefObject<IAmHere>;
  private writeSideRef: RefObject<WriteSide>;
  private readSideRef: RefObject<ReadSide>;
  private writeDatabaseRef: RefObject<Database>;
  private readDatabaseRef: RefObject<Database>;

  private get stage() {
    return this.stageRef.current ? this.stageRef.current.getStage() : null;
  }

  constructor(props: Readonly<props>) {
    super(props);

    this.stageRef = React.createRef();

    this.IAmHereRef = React.createRef();
    this.writeSideRef = React.createRef();
    this.readSideRef = React.createRef();
    this.writeDatabaseRef = React.createRef();
    this.readDatabaseRef = React.createRef();
  }

  componentDidMount = () => {

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUnmount = () => {

    window.removeEventListener('resize', this.resize);
  }

  render() {

    return (
      <Stage ref={this.stageRef}>
        <Layer>

          <IAmHere
            ref={this.IAmHereRef}
            x={150} y={200}
            width={100} height={100} />
          <WriteSide
            ref={this.writeSideRef}
            x={450} y={100}
            width={100} height={100} />
          <ReadSide
            ref={this.readSideRef}
            x={450} y={300}
            width={100} height={100} />
          <Database
            ref={this.writeDatabaseRef}
            x={750} y={100}
            width={100} height={100} />
          <Database
            ref={this.readDatabaseRef}
            x={750} y={300}
            width={100} height={100} />

          <Link source={this.IAmHereRef} target={this.writeSideRef} />
          <Link source={this.readSideRef} target={this.IAmHereRef} />

          <Link source={this.writeSideRef} target={this.writeDatabaseRef} />
          <Link source={this.writeSideRef} target={this.readDatabaseRef} />

          <Link source={this.readDatabaseRef} target={this.readSideRef} />

        </Layer>
      </Stage>
    );
  }

  private resize = () => {

    this.stage.attrs.width = window.innerWidth;
    this.stage.attrs.height = window.innerHeight / 2;
    this.stage._resizeDOM();
  }
}