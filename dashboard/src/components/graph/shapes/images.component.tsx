import React, { RefObject } from 'react';
import * as konva from 'react-konva';
import { DrawImage } from './draw-image';
import { EventEmitter } from 'events';
import { Connection, Rect } from '../../../models/geometrics';

type linkProps = {
  source: RefObject<BaseImage>,
  target: RefObject<BaseImage>
};
export class Link extends React.Component<linkProps> {

  private arrowRef: RefObject<any>;
  private connection: Connection;

  constructor(props: Readonly<linkProps>) {
    super(props);

    this.connection = {
      sourcePoint: {
        x: 0,
        y: 0
      },
      targetPoint: {
        x: 0,
        y: 0
      }
    };

    this.arrowRef = React.createRef();
  }

  componentDidMount() {

    if (this.props.source.current) {
      this.props.source.current.dragging.on('dragging', (rect: Rect) => {

        let connection = this.getConnectionBySource(rect);
        this.update(this.arrowRef.current, connection)
      });
    }

    if (this.props.target.current) {
      this.props.target.current.dragging.on('dragging', (rect: Rect) => {

        let connection = this.getConnectionByTarget(rect);
        this.update(this.arrowRef.current, connection)
      });
    }

    if (this.props.source.current && this.props.target.current) {

      let connection = this.getConnection(this.props.source.current.getRect(), this.props.target.current.getRect());
      this.update(this.arrowRef.current, connection);
    }
  }

  private update = (link: any, connection: Connection) => {

    this.connection = connection;

    var updatedPoints = [connection.sourcePoint.x, connection.sourcePoint.y, connection.targetPoint.x, connection.targetPoint.y];
    link.setPoints(updatedPoints);
  }

  private getConnection(sourceRect: Rect, targetRect: Rect): Connection {

    let inverted = sourceRect.position.x > targetRect.position.x;

    let connection = {
      sourcePoint: {
        x: sourceRect.position.x + (!inverted ? sourceRect.size.width : 0),
        y: sourceRect.position.y + sourceRect.size.height / 2
      },
      targetPoint: {
        x: targetRect.position.x + (inverted ? sourceRect.size.width : 0),
        y: targetRect.position.y + targetRect.size.height / 2
      }
    }

    return connection;
  }

  private getConnectionBySource(source: Rect): Connection {

    let inverted = source.position.x > this.connection.targetPoint.x;

    let sourcePoint = Object.assign({}, this.connection.sourcePoint, {
      x: source.position.x + (!inverted ? source.size.width : 0),
      y: source.position.y + source.size.height / 2
    });

    let connection = Object.assign({}, this.connection, { sourcePoint: sourcePoint });

    return connection;
  }

  private getConnectionByTarget(target: Rect): Connection {

    let inverted = this.connection.sourcePoint.x > target.position.x;

    let targetPoint = Object.assign({}, this.connection.sourcePoint, {
      x: target.position.x + (inverted ? target.size.width : 0),
      y: target.position.y + target.size.height / 2
    });

    let connection = Object.assign({}, this.connection, { targetPoint: targetPoint });

    return connection;
  }

  render() {
    return (
      <konva.Arrow
        ref={this.arrowRef}
        pointerLength={10}
        pointerWidth={10}
        fill='black'
        stroke='black'
        strokeWidth={4}
      />
    );
  }
}

type props = {
  x: number,
  y: number,
  width: number,
  height: number
};
export class BaseImage extends React.Component<props> {

  dragging: EventEmitter = new EventEmitter();

  private drawImageRef: RefObject<DrawImage>;

  protected source: string = '';

  constructor(props: Readonly<props>) {
    super(props);

    this.drawImageRef = React.createRef();
  }

  getRect(): Rect {
    if (!this.drawImageRef.current) {
      return {
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 0,
          height: 0
        }
      }
    }

    return this.drawImageRef.current.getRect();
  }

  private handleDrag = (rect: Rect) => {
    this.dragging.emit('dragging', rect);
  }

  render() {
    return (
      <DrawImage
        ref={this.drawImageRef}
        source={this.source}
        x={this.props.x} y={this.props.y}
        width={this.props.width} height={this.props.height}
        dragging={this.handleDrag}
      />
    );
  }
}

export class IAmHere extends BaseImage {

  constructor(props: Readonly<props>) {
    super(props);

    this.source = './assets/images/i-am-here.jpg';
  }
}

export class WriteSide extends BaseImage {

  constructor(props: Readonly<props>) {
    super(props);

    this.source = './assets/images/write-side.jpg';
  }
}

export class ReadSide extends BaseImage {

  constructor(props: Readonly<props>) {
    super(props);

    this.source = './assets/images/read-side.jpg';
  }
}

export class Database extends BaseImage {

  constructor(props: Readonly<props>) {
    super(props);

    this.source = './assets/images/database.png';
  }
}
