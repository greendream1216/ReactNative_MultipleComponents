import React, { Component } from "react";
import {View,Text,StyleSheet,Platform,TouchableOpacity,BackHandler,I18nManager,Dimensions} from "react-native";
import {Container,Button,Icon,Right,Item,Input,Header,Left,Body,Title} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import Mycontrol_panel from "./ControlPanel.js";
import tweens from "./tweens";

//BEGIN TO SETUP DRAWERSTYLE
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}
//END TO SETUP DRAWERSTYLE

// BEGIN TO SETUP FONT-TYPE AND FONT-SIZE
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (Dimensions.get("window").width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const font_type = {
    FontLight: 'Helvetica',
    FontBold : 'Helvetica-Bold'
};
// END TO SETUP FONT-TYPE AND FONT-SIZE
export default class DrawerExpanding extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: "static",
      openDrawerOffset: 50,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: "linear",
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left"
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.drawer.open();
    }, 1000);

  }

  //BEGIN TO SETUP TWEENHANDLER
  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }
  //END TO SETUP TWEENHANDLER

  //BEGIN TO SETUP OPENDRAWER
  openDrawer() {
    this.drawer.open();
  }
  //END TO SETUP OPENDRAWER



  render() {
    //BEGIN TO SETUP CONTROLPANEL VIEW
        var control_panel =
          <Mycontrol_panel closeDrawer={() => {
              this.drawer.close();
            }} />
    //END TO SETUP CONTROLPANEL VIEW

    return (
      <View style={styles.container}>
      {/* BEGIN TO SETUP DRAWER VIEW */}
        <Drawer
          ref={c => (this.drawer = c)}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={control_panel}
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={this.tweenHandler.bind(this)}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}>
        <View style={styles.drawercontainer}>
          {/* BEGIN TO SETUP HEADER VIEW */}
            <Header style={styles.header_sec}>
            {/* BEGIN TO SETUP LEFT VIEW */}
              <Left style={styles.left}>
                <TouchableOpacity
                  onPress={() => this.openDrawer()}
                  style={styles.back_arrow}>
                  <MaterialCommunityIcons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
              </Left>
            {/* END TO SETUP DRAWER VIEW */}

            {/* BEGIN TO SETUP BODY VIEW */}
              <Body style={styles.body}>
                <Text style={styles.text_title}>Category</Text>
              </Body>
            {/* END TO SETUP BODY VIEW */}

            {/* BEGIN TO SETUP RIGHT VIEW */}
              <Right style={styles.right}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.back_arrow}>
                  {I18nManager.isRTL ? (
                    <Ionicons
                      name="ios-arrow-round-forward"
                      size={30}
                      color="#ffffff"/>
                  ) : (
                    <Ionicons
                      name="ios-arrow-round-back"
                      size={30}
                      color="#ffffff"
                    />
                  )}
                </TouchableOpacity>
              </Right>
            {/* END TO SETUP RIGHT VIEW */}
            </Header>
          {/* END TO SETUP HEADER VIEW */}
          </View>
        </Drawer>
      {/* END TO SETUP DRAWER VIEW */}
      </View>
    );
  }
}
// BEGIN TO MAKE STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  control_panel: {
    flex: 1,
    backgroundColor:'transparent',
  },
  header_sec: {
    backgroundColor: "#ff6347",
		height: Dimensions.get("window").height * 0.1,
		borderBottomWidth: 0,
		paddingTop: (Dimensions.get("window").height * 0.045),
		elevation: 0,
		paddingLeft: (Dimensions.get("window").width * 0.05),
		paddingRight: (Dimensions.get("window").width * 0.05),
  },
  left: {
		flex: 0.5,
  },
  back_arrow: {
    width:30,
		justifyContent: 'center',
		alignItems: 'center'
  },
  body: {
		flex: 3,
		alignItems: 'center',
  },
  text_title: {
    color: 'white',
    fontSize: moderateScale(16),
    alignSelf: 'center',
	  fontFamily: font_type.FontBold,
  },
  right: {
    flex: 0.5,
  },
  drawercontainer:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: '#f2f2f2',
  },
});
// END TO MAKE STYLE
