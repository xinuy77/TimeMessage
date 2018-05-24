import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {TwitterLoginButton} from 'react-social-login-buttons';
import {Button, Icon} from 'react-materialize'
import Footer                                                    from 'react-materialize/lib/Footer';
const cardStyle = {width: '20%', margin: 'auto', marginTop:'1%'};

class Home extends Component {
   constructor(props) {
       super(props);
   }
   render() {
      return (
         <div>
           <div class="section white">
             <div class="row container" style={{textAlign:'center'}}>
               <img src={require('./top.png')} style={{width: this.props.isMobile ? '100%':'25%'}}/>
             </div>
           <Card style={{textAlign:'center', width: this.props.isMobile ? '100%' : '20%', margin: 'auto', maginTop:'1%'}}>
             <CardTitle subtitle="ログイン/登録"/>    
               <TwitterLoginButton text="Twitterでログイン/登録する" onClick={()=>window.location.href= "/auth/twitter"}/>
               <cardText style={{fontSize:'10px'}}><a href="/contract">利用規約・プライバシーポリシー</a>に同意の上ご利用下さい</cardText>
             <CardActions>
             </CardActions>
           </Card>
           </div>
           <div class="parallax-container" style={{height: '100%'}}>
             <div class="row container" style={{textAlign:'center'}}>
               <h5 class="header" style={{textAlign:'center'}}>タイムメッセージとは?</h5>
               <div style={{width:"100%", textAlign:'center', margin: 'auto'}}>
                 <p class="grey-text text-darken-3 lighten-3">閲覧日を指定されたメッセージを受け取る事ができるサービスです。</p>
                 <p class="grey-text text-darken-3 lighten-3">受け取ったメッセージは送り主に指定された閲覧日まで本文を読むことはできません。</p>
                <p class="grey-text text-darken-3 lighten-3">指定された閲覧日までメッセージの送り主、タイトル、閲覧可能日のみ確認する事ができます。</p>
               </div>
             </div>
             <div class="row container" style={{textAlign:'center'}}>
               <h5 class="header" style={{textAlign:'center'}}>使い方</h5>
               <div style={{width: this.props.isMobile ? "100%":"26%", textAlign:'left', margin: 'auto'}}>
                 <p class="grey-text text-darken-3 lighten-3">1. Twitterアカウントで登録</p>
                 <p class="grey-text text-darken-3 lighten-3">2. URLをシェアする</p>
                 <p class="grey-text text-darken-3 lighten-3">3. オープンデイ(閲覧可能日)にメッセージを読む</p>
               </div>
             </div>
           </div>
         </div>
      );
   }
}
export default Home;
