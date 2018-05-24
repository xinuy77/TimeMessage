import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Icon} from 'react-materialize';


class App extends Component {
    constructor() {
      super();
      this.state = {
         data:[
            {
               component: 'First...',
               id: 1
            },
            {
               component: 'Second...',
               id: 2
            },
            {
               component: 'Third...',
               id: 3
            }
         ]
      }
      this.updateState = this.updateState.bind(this);
   }
   updateState(e) {
       var data = this.state.data;
       data[data.length] = {component: 'added', id: data[data.length-1].id + 1}
       this.setState({
           data: data
       });
   }
   render() {
      return (
         <div>
            <div>
               {this.state.data.map((dynamicComponent, i) =><Content key = {i} componentData = {dynamicComponent}/>)}
            </div>
            <Button waves='light' onClick = {this.updateState}>
              <Icon>thumb_up</Icon>
            </Button>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <div>{this.props.componentData.component}</div>
            <div>{this.props.componentData.id}</div>
         </div>
      );
   }
}
export default App;
