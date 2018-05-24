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
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {TwitterLoginButton} from 'react-social-login-buttons';
import {TwitterShareButton} from 'react-share';

const buttonStyle = {margin: 12, textAlign: 'center'};

class AvailableMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:  this.props.msg,
            open: this.props.open
        }
        this.handleModalOpen  = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.renderMessage    = this.renderMessage.bind(this);
        this.renderLoadButton = this.renderLoadButton.bind(this);
    }
    handleModalOpen(rowNumber) {
        var open = this.props.open;
        var msg  = this.props.msg;
        open[rowNumber]     = true;
        msg[rowNumber].read = true;
        this.putRead(msg[rowNumber]);
        this.setState({open: open, msg: msg});
    }
    handleModalClose() {
        var open = this.state.open;
        for(var i = 0; i < open.length; i++) {
            if(open[i]) {
                open[i] = false;
                break;
            }
        }
        this.setState({open: open});
    }
    putRead(msg) {
        console.log(msg)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch('/message/read', {
            credentials: 'include', 
            method:      'PUT', 
            body:         JSON.stringify(msg),
            headers:      headers
        }).then(()=>{
            window.location.href = '/s/' + msg.shareRoute;
        });
    }
    toNormalDateString(isoDateString) {
        var date = new Date(isoDateString);
        return date.toLocaleDateString();
    }
    renderMessage() {
        if(this.props.availableMsg.length === 0) {
            return (
              <div>
                <span style={{paddingLeft:'2%', margin: 'auto', textAlign:'center'}}>
                  開封可能なメッセージはありません。
                </span>
              </div>
            );
        }
        else {
            return(
                <Table onCellClick={this.handleModalOpen}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn>なまえ</TableHeaderColumn>
                      <TableHeaderColumn>タイトル</TableHeaderColumn>
                      <TableHeaderColumn>オープンデイ</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody showRowHover={true} displayRowCheckbox={false}>
                  {this.props.availableMsg.map((r, i)=> 
                    <TableRow hoverable={true} hovered={this.props.msg[i].read}>
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
              <RaisedButton label="もっと読み込む" primary={true} style={buttonStyle}  onClick={()=>{this.props.getMsg(false, true)}}/>
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
            <CardTitle subtitle="メッセージ" />
              {this.renderMessage()}
            <CardActions style={{textAlign:'center'}}>
              {this.renderLoadButton()}
            </CardActions>
          </Card>
        );
    }
}

export default AvailableMessage;
