import React, {Component} from 'react';
import ReactDOM           from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';

const cardStyle = {width: '40%', margin: 'auto', marginTop:'1%'};

class ComposeMsg extends Component {
    constructor() {
        super();
        this.state = {
            username      : null,
            route         : null,
            sender        : null,
            title         : null,
            text          : null,
            available_date: null,
            open          : false
        }
        this.getUser();
        this.renderUsername     = this.renderUsername.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleTitleChange  = this.handleTitleChange.bind(this);
        this.handleTextChange   = this.handleTextChange.bind(this);
        this.handleDateChange   = this.handleDateChange.bind(this);
        this.sendMsg            = this.sendMsg.bind(this);
    }
    getUser() {
        var url        = window.location.href;
        var firstIndex = url.indexOf('/m/')+3; 
        var userRoute  = url.substring(firstIndex, url.length);
        var route      = '/route/' + userRoute;
        fetch(route)
            .then((res)=>{
                if(res.ok) {
                    return res.json();
                }
                else {
                    window.location.href = '/';
                }
            })
            .then((user)=>{
                this.setState({
                    username: user.u_name, 
                    route   : userRoute
                });
            });
    }
    renderUsername(){
        return(
            <div>
            {this.state.username}さんにタイムメッセージを送ろう
            </div>
        );
    }
    handleSenderChange(event) {
        this.setState({sender: event.target.value});
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }
    handleTextChange(event) {
        this.setState({text: event.target.value});
    }
    handleDateChange(event, date) {
        this.setState({available_date: date});
    }
    sendMsg() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var msg = {
            route         : this.state.route,
            sender        : this.state.sender,
            title         : this.state.title,
            text          : this.state.text,
            available_date: this.state.available_date
        };
        fetch('/message',{
            method : 'POST',
            body   : JSON.stringify(msg),
            headers: headers 
        })
        .then(()=>{
            this.handleOpen();
        });   
    }
    handleOpen() {
        this.setState({open: true});
    }
    handleClose() {
        window.location.href = '/';
    }
    render() {
        return(
          <div>
            <Dialog
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              メッセージを送信しました！
            </Dialog>
            <Card style={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}}>
              <CardTitle title={this.renderUsername()} style={{textAlign:'center'}}/>    
              <CardText style={{textAlign: 'center'}}>
                <a href='/'>タイムメッセージとは?</a><br/>
                <TextField
                  style={{width: '80%'}}
                  hintText="10文字まで"
                  floatingLabelText="名前"
                  value={this.state.sender}
                  onChange={this.handleSenderChange}  
                />
                <br />
                <TextField
                  style={{width: '80%'}}
                  hintText="12文字まで"
                  floatingLabelText="タイトル"
                  value={this.state.title}
                  onChange={this.handleTitleChange}  
                />
                <br />
                <br />
                <TextField
                  style={{width: '80%'}}
                  hintText="メッセージ"
                  multiLine={true}
                  rows={1}
                  value={this.state.text}
                  onChange={this.handleTextChange}  
                />
                <br />
                <DatePicker 
                  style={{textAlign:'center'}}
                  dialogContainerStyle={{width:'5%'}} 
                  hintText="開封可能日" 
                  container="inline" 
                  mode="portrait" 
                  DateTimeFormat={Intl.DateTimeFormat} 
                  locale='ja-JP'
                  value={this.state.available_date}
                  onChange={this.handleDateChange}  
                />
                    
               <span style={{fontSize:'10px'}}><a href="/contract">利用規約・プライバシーポリシー</a>に同意の上ご利用下さい</span>
              </CardText>
              <CardActions style={{textAlign:'center'}}>
                <RaisedButton primary={true} label="タイムメッセージを送る" onClick={this.sendMsg}/>
              </CardActions>
            </Card>
          </div>
        );
    }
}
export default ComposeMsg;
