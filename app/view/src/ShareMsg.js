import React, {Component} from 'react';
import ReactDOM           from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {TwitterLoginButton} from 'react-social-login-buttons';
import {TwitterShareButton} from 'react-share';

class ShareMsg extends Component {
    constructor() {
        super();
        this.state = {
            shareRoute: this.setRoute()
        };
    }
    setRoute() {
        var url        = window.location.href;
        var shareRoute = url.substring(url.indexOf('/s/')+3, url.length); 
        return shareRoute;
    }
    render() {
        return(
          <div>
            <Card style={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}}>
              <CardText style={{textAlign: 'center'}}>
                <img 
                  src={'/message/img/' + this.state.shareRoute} 
                  onError={()=>{window.location.href = '/'}}
                  style={{width: '100%', height: '100%'}}/>
                <TwitterShareButton
                  url={window.location.href}
                  title={"#TimeMessage #タイムメッセージ"}
                  className="Demo__some-network__share-button">
                  <TwitterLoginButton text="Twitterでシェアする"/>
                </TwitterShareButton>
                <a href='/'>タイムメッセージとは?</a><br/>
              </CardText>
            </Card>
          </div>
        );
    }
}

export default ShareMsg;
