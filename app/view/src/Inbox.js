import React, {Component} from 'react';
import ReactDOM           from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import UnavailableMessage from './UnavailableMessage';
import AvailableMessage from './AvailableMessage';
import {TwitterIcon, TwitterShareButton} from 'react-share';
const cardStyle = {width: '30%', margin: 'auto', marginTop:'1%'};
var available_load   = 0;
var unavailable_load = 0;

class Inbox extends Component {
    constructor(props) {
        super(props);
        var url = window.location.href;
        url = url.replace('/inbox','');
        this.state = {
            availableMsg: [],
            unAvailableMsg:[],
            open: [],
            msg: [],
            hasNextAvailableMsg: true,
            hasNextUnavailableMsg: true,
            userRoute: null,
            url: url
        }
        this.getMsg(true, false);
        this.getUserRoute();
        this.getMsg       = this.getMsg.bind(this);
        this.getUserRoute = this.getUserRoute.bind(this);
    }
    getUserRoute() {
        fetch('/user', {credentials:'include'})
            .then((res)=>{
                return res.json();
            })
            .then((user)=>{
                var url = this.state.url + '/m/' + user.route;
                this.setState({
                   userRoute: user.route,
                   url: url
                });
            });
    }
    getMsg(bothLoad, availableLoad) {
        var open           = this.state.open;
        var msg            = this.state.msg;
        var availableMsg   = this.state.availableMsg;
        var unAvailableMsg = this.state.unAvailableMsg;
        var route          = '/message/10';
        var hasNextAvailableMsg;
        var hasNextUnavailableMsg;
        if(bothLoad) {
            available_load   += 10;
            unavailable_load += 10;
        }
        else if(availableLoad && !bothLoad) {
            available_load   += 10;
            route = '/message/' + available_load;
        }
        else {
            unavailable_load += 10;
            route = '/message/' + unavailable_load;
        }
        fetch(route, {credentials: 'include'})
        .then((res)=>{
            if(res.ok) {
                try {
                    return res.json();
                }catch(err) {
                    return null;
                }
            }
            else {
                return null;
            }
        })
        .then((data)=>{
            if(data === null || data === undefined) {
                return;
            }
            if(data.hasOwnProperty('availableMsg')) {
                for(var i = 0; i < data.availableMsg.length; i++) {
                    open.push(false);
                    msg.push({
                        read: data.availableMsg[i].read,
                        m_id: data.availableMsg[i].m_id,
                        shareRoute: data.availableMsg[i].shareRoute
                    }); 
                }
            }
            if(bothLoad) {
              availableMsg   = availableMsg.concat(data.availableMsg);
              unAvailableMsg = unAvailableMsg.concat(data.unAvailableMsg);
              if(data.availableMsg.length === 0) {
                  hasNextAvailableMsg = false;
                  this.setState({hasNextAvailableMsg: false});
              }
              if(data.unAvailableMsg.length === 0) {
                  hasNextUnavailableMsg = false;
                  this.setState({hasNextUnavailableMsg: false});
              }
            }
            else if(availableLoad && !bothLoad) {
              availableMsg   = availableMsg.concat(data.availableMsg);
              if(data.availableMsg.length === 0) {
                  hasNextAvailableMsg = false;
                  this.setState({hasNextAvailableMsg: false});
              }
            }
            else {
              unAvailableMsg = unAvailableMsg.concat(data.unAvailableMsg);
              if(data.unAvailableMsg.length === 0) {
                  hasNextUnavailableMsg = false;
                  this.setState({hasNextUnavailableMsg: false});
              }
            }
            this.setState({
                availableMsg: availableMsg,
                unAvailableMsg: unAvailableMsg,
                open: open,
                msg: msg
            });
        })
    }
    render() {
        return (
            <div style={{height: '100%'}}>
              <Card style={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}}>
                <CardTitle title="使い方"/>    
                <CardText>
                 1. URLをSNSでシェアする<br/>
                 2. オープンデイ(閲覧可能日)にメッセージを読む<br/>       
                 <br/> 
                 URLをシェアしてメッセージを送ってもらおう！
                  <br/>
                  <br/>
                  <a href={this.state.url}><h5>{this.state.url}</h5></a>
                </CardText>
                <CardActions style={{textAlign:'center', width:'100%'}}>
                   <CopyToClipboard text={this.state.url} onCopy={()=>{alert('URLをコピーしました')}}>
                  <RaisedButton label="URLをコピーする"/>
                  </CopyToClipboard>
                  <TwitterShareButton
                    url={this.state.url}
                    title={"#TimeMessage #タイムメッセージ"}
                    className="Demo__some-network__share-button">
                    <TwitterIcon
                      size={32}
                    round />
                  </TwitterShareButton>
                </CardActions>
              </Card>
              <UnavailableMessage 
                cardStyle={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}} 
                message={this.state.unAvailableMsg}
                getMsg={this.getMsg}
                hasNext={this.state.hasNextUnavailableMsg}
              />
              <AvailableMessage 
                cardStyle={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}} 
                availableMsg={this.state.availableMsg} 
                msg={this.state.msg} 
                open={this.state.open}
                getMsg={this.getMsg}
                hasNext={this.state.hasNextAvailableMsg}
              />
            </div>
        );
    }
}
export default Inbox;
