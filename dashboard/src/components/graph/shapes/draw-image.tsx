import React, { RefObject } from 'react';
import * as konva from 'react-konva';
import { Rect } from '../../../models/geometrics';

type props = {
  source: string
  x: number,
  y: number,
  width: number,
  height: number,
  dragging?: any
};
type state = {
  image: any
};
export class DrawImage extends React.Component<props, state> {

  private imageRef: RefObject<any>;

  constructor(props: Readonly<props>) {
    super(props);

    this.imageRef = React.createRef();

    this.state = {
      image: new Image()
    };
  }

  componentDidMount() {
    this.loadImage();
    this.registerEvents();
  }

  getRect(): Rect {

    if (!this.imageRef.current) {
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

    return {
      position: {
        x: this.imageRef.current.getX(),
        y: this.imageRef.current.getY()
      },
      size: {
        width: this.imageRef.current.getWidth(),
        height: this.imageRef.current.getHeight()
      }
    }
}

  private loadImage() {
    let image = new Image();
    image.src = this.props.source;
    image.onload = () => {

      this.setState({
        image: image
      });
    }
  }

  private registerEvents() {
    this.imageRef.current.on('dragmove', () => {

      let rect: Rect = this.getRect();
      this.props.dragging(rect);
    });    
  }

  render() {
    return (
      <konva.Image
        ref={this.imageRef}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
        draggable={true}
      />
    );
  }
}
