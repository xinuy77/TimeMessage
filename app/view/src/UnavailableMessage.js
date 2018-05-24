import React, {Component} from 'react';
import ReactDOM           from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {margin: 12, textAlign: 'center'};

class UnavailableMessage extends Component {
    constructor(props) {
        super(props);
        this.renderMessage    = this.renderMessage.bind(this);
        this.renderLoadButton = this.renderLoadButton.bind(this);
    }
    toNormalDateString(isoDateString) {
        var date = new Date(isoDateString);
        return date.toLocaleDateString();
    }
    renderMessage() {
        if(this.props.message.length === 0) {
            return (
               <div>
                 <span style={{paddingLeft:'2%', margin: 'auto', textAlign:'center'}}>
                   タイムメッセージはありません。
                 </span>
               </div>
            );
        }
        else {
            return (
                <Table>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>なまえ</TableHeaderColumn>
                      <TableHeaderColumn>タイトル</TableHeaderColumn>
                      <TableHeaderColumn>オープンデイ</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody showRowHover={false} displayRowCheckbox={false}>
                      {this.props.message.map((r, i)=> 
                        <TableRow hoverable={false} selectable={false}>
                          <TableRowColumn>{r.sender}</TableRowColumn>
                          <TableRowColumn>{r.title}</TableRowColumn>
                          <TableRowColumn>{this.toNormalDateString(r.available_date)}</TableRowColumn>
                        </TableRow>
                       )}
                  </TableBody>  
                </Table>
            );
        }
    }
    renderLoadButton() {
        if(this.props.hasNext) {
            return(
              <RaisedButton label="もっと読み込む" primary={true} style={buttonStyle}  onClick={()=>{this.props.getMsg(false, false)}}/>
            );
        }
        else {
            return(
                <div/>
            );
        }
    }
    render() {
        return(
          <Card style={this.props.cardStyle}>
            <CardTitle subtitle="タイムメッセージ" />
                {this.renderMessage()}
            <CardActions style={{textAlign:'center'}}>
              {this.renderLoadButton()}
            </CardActions>
          </Card>
        );
    }
}
export default UnavailableMessage;
