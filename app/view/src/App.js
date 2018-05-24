import React, {Component}                                        from 'react';
import MuiThemeProvider                                          from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme }                                           from 'material-ui/styles';
import {RaisedButton, AppBar, Tabs, Tab, ToolbarGroup, FlatButton, IconButton, FontIcon} from 'material-ui';
import NavigationMenu                                            from 'material-ui/svg-icons/navigation/menu';
import LoginoutIcon                                              from 'material-ui/svg-icons/action/input';
import TwitterLogo                                               from './twitter_logo.png';
import InboxIcon                                                 from 'material-ui/svg-icons/content/inbox';
import {BrowserRouter as Router, Switch, Route}                  from 'react-router-dom';
import {withCookies, Cookies}                                                 from 'react-cookie';
import {instanceOf}                                              from 'prop-types';
import Home                                                      from './Home';
import Login                                                     from './Login';
import Inbox                                                     from './Inbox';
import Compose                                                   from './ComposeMsg';
import Share                                                     from './ShareMsg';
import Footer                                                    from 'react-materialize/lib/Footer';
import Contract                                                  from './Contract';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import StickyFooter from 'react-sticky-footer';
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const baseUrl      = process.env.PUBLIC_URL;
const INBOX_TEXT   = "メッセージ";
const LOGIN_TEXT   = "ログイン/登録";
const LOGOUT_TEXT  = "ログアウト";
const barStyle     = {height: '40px', flexWrap: 'wrap', backgroundColor: 'white'};
const titleStyle   = {paddingLeft: '20%', color: 'black', fontSize:'22px'};
const tabStyle     = {width: '100%'};

const MyTabs = () => (
    <Tabs style={tabStyle}>
      <Tab label="Item 1" />
      <Tab label="Item 2" style={{backgroundColor: "black"}} />
      <Tab label="Item 3" />
      <Tab label="Item 4" />
    </Tabs>
  );

const MyNavLinks = () => (
    <ToolbarGroup>
      <FlatButton primary={true} label={LOGIN_TEXT} href={baseUrl+"/"} icon={<LoginoutIcon color="#4FC3F7"/>}/>
      <FlatButton primary={true} label={LOGOUT_TEXT} href="#" icon={<LoginoutIcon color="#4FC3F7"/>}/>
      <FlatButton primary={true} label={INBOX_TEXT} href= "/inbox" icon={<InboxIcon color="#4FC3F7"/>}/>
    </ToolbarGroup> 
);


class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            session: false,
            isMobile: this.isMobile(),
            menuOpen: false
        }
        this.checkSession();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.removeSession          = this.removeSession.bind(this);
        this.checkSession           = this.checkSession.bind(this);
        this.renderNavLinks         = this.renderNavLinks.bind(this);
        this.handleMenuToggle       = this.handleMenuToggle.bind(this);
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    handleMenuToggle() {
        this.setState({menuOpen: !this.state.menuOpen});
    }
    updateWindowDimensions() {
        this.setState({isMobile: this.isMobile()});
    }
    isMobile() {
        if(window.innerWidth <= 600) {
            return true;
        }
        else {
            return false;
        }
    }
    checkSession() {
        fetch('/loggedin', {credentials: 'include'})
            .then((res)=>{
                if(res.ok) {
                    this.setState({session: true});
                }
                else {
                    this.setState({session: false});
                }
            });
    }
    renderNavLinks() {
        if(this.state.session) {
            return(
              <div>      
              <ToolbarGroup style={{height: '23px'}}>
                <FlatButton primary={true} label={INBOX_TEXT} href= "/inbox" icon={<InboxIcon color="#4FC3F7"/>}/>
                <FlatButton primary={true} label={LOGOUT_TEXT} href="#" icon={<LoginoutIcon color="#4FC3F7"/>} onClick={this.removeSession}/>
              </ToolbarGroup> 
              </div>
            );
        }
        else {
            return(
              <div>      
              <ToolbarGroup style={{height: '23px'}}>
                <FlatButton primary={true} label={INBOX_TEXT} href= "/" icon={<InboxIcon color="#4FC3F7"/>}/>
                <FlatButton primary={true} label={LOGIN_TEXT} href={baseUrl+"/"} icon={<LoginoutIcon color="#4FC3F7"/>}/>
              </ToolbarGroup> 
              </div>
            );
        }
    }
    removeSession() {
        fetch('/logout', {credentials: 'include'})
            .then(()=>{
                window.location.href = "/";
            });
    }
    
    render() {
        return (
            <MuiThemeProvider>
              <AppBar 
                title={this.state.isMobile ? "Time Message" : <img src={require('./logo2.png')} />}
                iconElementLeft={<IconButton><NavigationMenu color="black" /></IconButton>} 
                showMenuIconButton={this.state.isMobile} 
                style={{height: this.state.isMobile ? '60px':'40px', flexWrap: 'wrap', backgroundColor: 'white'}}
                titleStyle={{paddingLeft: this.state.isMobile ? '0%':'20%', color: 'black', fontSize:'22px'}}
                iconElementRight={this.state.isMobile ? null : this.renderNavLinks()}
                onLeftIconButtonClick={this.handleMenuToggle}
              />
                <Drawer
                    open={this.state.menuOpen}
                    docked={false}
                    onRequestChange={(open)=>this.setState({menuOpen: open})}
                >
                  <a href={this.state.session ? '/inbox':'/'}><MenuItem leftIcon={<InboxIcon/>}>受信箱</MenuItem></a>
                  <MenuItem style={{visibility: this.state.session ? 'visible':'hidden' }} leftIcon={<LoginoutIcon/>} onClick={this.removeSession}>ログアウト</MenuItem>
                </Drawer>
              <Router>
                <Switch>
                  <Route exact path={baseUrl+'/'} render={(props)=> <Home isMobile={this.state.isMobile} />}/>
                  <Route exact path={baseUrl+'/login'} component={Login} />
                  <Route exact path={baseUrl+'/inbox'} render={(props)=> <Inbox isMobile={this.state.isMobile} />}/>
                  <Route exact path={baseUrl+'/contract'} render={(props)=> <Contract isMobile={this.state.isMobile} />}/>
                  <Route exact path={baseUrl+'/m/*'} render={(props)=> <Compose isMobile={this.state.isMobile} />}/>
                  <Route exact path={baseUrl+'/s/*'} render={(props)=> <Share isMobile={this.state.isMobile} />}/>
                </Switch>
              </Router>
              <footer style={{textAlign: 'center', backgroundColor: '#EEEEEE', position:'fixed', left: 0, bottom: 0, right: 0}}>
                <span style={{color: 'grey'}}>©2018 Time Message</span>
              </footer>
            </MuiThemeProvider>
        );
    }
}
export default withCookies(App);
