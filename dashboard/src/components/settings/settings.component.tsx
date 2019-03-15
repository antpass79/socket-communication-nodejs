import React from 'react';

type props = {
  squares?: number[],
  onClick?: any
};
type state = {
  value: number
};
export class Settings extends React.Component<props, state> {

  render() {
    return <div>Settings</div>;
  }
}
