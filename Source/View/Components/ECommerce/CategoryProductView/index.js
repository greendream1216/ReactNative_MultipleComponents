import React, { Component } from "react";
import {View,Text,Image,StatusBar,Platform,StyleSheet,Dimensions,TouchableOpacity,BackHandler,ListView,ImageBackground,ScrollView,Picker,I18nManager,AsyncStorage} from "react-native";
import {Container,Button,Right,Left,ListItem,Content,Body,Header} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dropdown from "../../../ThirdPartyModule/Dropdown/dropdown/";
import GlobalInclude from "../../../../Global/GlobalInclude/globalinclude.js";
import { CachedImage } from "react-native-cached-image";


var ProductData = [];
// BEGIN TO SETUP FONT-TYPE AND FONTSIZE
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (Dimensions.get("window").width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const font_type = {
    FontLight: 'Helvetica',
    FontBold : 'Helvetica-Bold'
};
// END TO SETUP FONT-TYPE AND FONTSIZE

// BEGIN TO PRODUCT ARRAY
var data = [
  {
    id: 0,
    isLike: true,
    productImage: GlobalInclude.Image3,
    productTitle: "Lorem Ipsum",
    price: "$10.50",
    size: [
      { id: 1, value: "M" },
      { id: 2, value: "L" },
      { id: 3, value: "X" },
      { id: 4, value: "XL" }
    ],
    color: [
      { id: 1, color: "#e70f08" },
      { id: 2, color: "#c0c0c0" },
      { id: 3, color: "#885d25" }
    ],
    selectedColorId: 1
  },
  {
    id: 1,
    isLike: true,
    productImage: GlobalInclude.Image9,
    productTitle: "Lorem Ipsum",
    price: "$20.00",
    size: [
      { id: 1, value: "M" },
      { id: 2, value: "L" },
      { id: 3, value: "X" },
      { id: 4, value: "XL" }
    ],
    color: [
      { id: 1, color: "#0947ba" },
      { id: 2, color: "#c4c9d7" },
      { id: 3, color: "#3CB371" },
      { id: 4, color: "#885d25" }
    ],
    selectedColorId: 3
  },
  {
    id: 2,
    isLike: true,
    productImage: GlobalInclude.Image8,
    productTitle: "Lorem Ipsum",
    price: "$99.00",
    size: [
      { id: 1, value: "M" },
      { id: 2, value: "L" },
      { id: 3, value: "X" },
      { id: 4, value: "XL" }
    ],
    color: [
      { id: 1, color: "#e70f08" },
      { id: 2, color: "#c0c0c0" },
      { id: 3, color: "#885d25" },
      { id: 4, color: "#FFFF00" },
      { id: 5, color: "#3CB371" },
      { id: 6, color: "#885d25" }
    ],
    selectedColorId: 5
  }
];
// END TO PRODUCT ARRAY


export default class CategoryProduct extends Component {
  constructor(props) {
    super(props);
    // BEGIN TO SETUP STATE
    this.state = {
      screenLink: "",
      selectedSize: "M",
      selectedLots: "1",
      isDroDownOpen: false,
      typography: "M",
      selectedColor: [],
      product_id: []
    };
    // END TO SETUP STATE
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillMount() {
    ProductData = data;
  }

  //BEGIN TO SETUP HANDLEBAGNAVIGATION
  _handleBagNavigation() {
    alert("Bag Button Click")
  }
  //END TO SETUP HANDLEBAGNAVIGATION

  //BEGIN TO SETUP HANDLEWISHLISTNAVIGATION
  _handleWishListNavigation() {
    alert("Wishlist Button Click")
  }
  //END TO SETUP HANDLEWISHLISTNAVIGATION

  //BEGIN TO SETUP ONCHANGETEXT
  onChangeText(text) {
    this.setState({ user_category_id: text });
  }
  //END TO SETUP ONCHANGETEXT

  //BEGIN TO SETUP ONCHECKBOXPRESS
  onCheckBoxPress(id) {
    this.setState({
      selectedLots: id
    });
  }
  //END TO SETUP ONCHECKBOXPRESS

  //BEGIN TO SETUP HANDLEDROPDOWNCLICK
  _handleDropDownClick(size) {
    this.setState({ selectedSize: size });
    this.setState({ isDroDownOpen: !this.state.isDroDownOpen });
  }
  //END TO SETUP HANDLEDROPDOWNCLICK

  //BEGIN TO SETUP COLOR CHECKBOX
  onCheckBoxPressColor(productid, selectedColorId, colorid) {
    var i;
    for (i = 0; i < ProductData.length; i++) {
      if (ProductData[i].id == productid) {
        ProductData[i].selectedColorId = colorid;
      }
    }
    ProductData = ProductData;
    this.setState({
      ProductData: ProductData
    });
  }
  //END TO SETUP COLOR CHECKBOX

  //BEGIN TO SETUP HANDLELIKE
  _handleLike(id, like) {
    var i;
    for (i = 0; i < ProductData.length; i++) {
      if (ProductData[i].id == id) {
        if (like == true) {
          ProductData[i].isLike = false;
        } else {
          ProductData[i].isLike = true;
        }
      }
    }
    this.setState({
      ProductData: ProductData
    });
    ProductData = ProductData;
  }
  //END TO SETUP HANDLELIKE

  render() {
    const { screenLink } = this.state;
    // BEGIN TO SETUP STATUSBAR VIEW
    StatusBar.setBarStyle('light-content', true);
    if(Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent',true);
      StatusBar.setTranslucent(true);
    }
    // END TO SETUP STATUSBAR VIEW

    return (
      <Container style={styles.main}>
      {/* BEGIN TO SETUP HEADER VIEW */}
        <Header androidStatusBarColor={"#0e1130"} style={styles.header}>
        {/* BEGIN TO SETUP LEFT VIEW */}
        <Left style={styles.left}>
          <TouchableOpacity style={styles.back_arrow} onPress={() => this.props.navigation.goBack()}>
            <FontAwesome name={I18nManager.isRTL ? "angle-right" : "angle-left"} size={30} color="white" />
          </TouchableOpacity>
        </Left>
        {/* END TO SETUP LEFT VIEW */}

        {/* BEGIN TO SETUP BODY VIEW */}
          <Body style={styles.body}>
            <Text style={styles.text_title}>Products</Text>
          </Body>
        {/* END TO SETUP BODY VIEW */}

        {/* BEGIN TO SETUP RIGHT VIEW */}
          <Right style={styles.right}>
            <TouchableOpacity style={styles.heart_bg} onPress={() => this._handleWishListNavigation()}>
              <FontAwesome name="heart" size={8} style={styles.heart_icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._handleBagNavigation()}>
              <SimpleLineIcons
                name="handbag"
                size={18}
                style={styles.bag_icon}/>
            </TouchableOpacity>
          </Right>
        {/* END TO SETUP RIGHT VIEW */}
        </Header>
      {/* END TO SETUP HEADER VIEW */}

        <Content>
          {ProductData.map((item, index) => {
            return (
              <View style={styles.row} key={index}>
                <TouchableOpacity style={styles.row_bg} activeOpacity={1}>
                {/* BEGIN TO SETUP IMAGE VIEW */}
                  <CachedImage source={item.productImage} style={styles.product_image}>
                  {/* BEGIN TO SETUP LIKE VIEW */}
                    {item.isLike == true ? (
                      <TouchableOpacity onPress={() => this._handleLike(item.id, item.isLike)}>
                        <FontAwesome
                          name="heart"
                          size={18}
                          color={"red"}
                          style={styles.heart_list_icon}/>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => this._handleLike(item.id, item.isLike)}>
                        <FontAwesome
                          name="heart"
                          size={18}
                          color={"#cecece"}
                          style={styles.heart_list_icon}/>
                      </TouchableOpacity>
                    )}
                    {/* END TO SETUP HEADER VIEW */}
                  </CachedImage>
                {/* END TO SETUP IMAGE VIEW */}


                  <View style={styles.product_detail_bg}>
                  {/* BEGIN TO SETUP PRODUCTTITLE VIEW */}
                    <Text style={styles.product_title_txt}>
                      {item.productTitle}
                    </Text>
                  {/* END TO SETUP PRODUCTTITLE VIEW */}

                  {/* BEGIN TO SETUP PRODUCTPRICE VIEW */}
                    <View style={[styles.detail_field_row,{paddingTop: Dimensions.get("window").width * 0.01,paddingBottom: Dimensions.get("window").width * 0.01}]}>
                      <Text style={styles.price_txt}>{item.price}</Text>
                    </View>
                    {/* END TO SETUP PRODUCTPRICE VIEW */}

                  {/* BEGIN TO SETUP SIZE VIEW */}
                    <View style={[styles.detail_field_row,{ marginTop: Dimensions.get("window").width * 0.07 }]}>
                      <Text style={styles.product_title_txt}>Size</Text>
                      <View>
                        <Dropdown
                          data={item.size}
                          ref="catInput"
                          value={this.state.typography}
                          onChangeText={this.onChangeText}
                          labelHeight={0}
                          containerStyle={styles.dropstyle}
                          baseColor="rgba(0, 0, 0, .00)"
                          dropdownPosition={1}/>
                      </View>
                    </View>
                  {/* END TO SETUP SIZE VIEW */}

                  {/* BEGIN TO SETUP COLOR VIEW */}
                    <View style={[styles.detail_field_row,{marginTop: Dimensions.get("window").width * 0.03,marginBottom: Dimensions.get("window").height * 0.015}]}>
                      <Text style={styles.product_title_txt}>Color</Text>
                      <View style={styles.list_color_bg}>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}>
                          {item.color.map((itemColor, index) => {
                            return (
                              <View key={index}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.onCheckBoxPressColor(
                                      item.id,
                                      item.selectedColorId,
                                      itemColor.id
                                    )
                                  }
                                  style={item.selectedColorId == itemColor.id ? [styles.color_viewer,{backgroundColor: itemColor.color,marginRight: Dimensions.get("window").width * 0.02,borderColor: "#ffc700"}]
                                      : [styles.color_viewer,{backgroundColor: itemColor.color,marginRight: Dimensions.get("window").width * 0.02,borderColor: "transparent"}]}/>
                              </View>
                            );
                          })}
                        </ScrollView>
                      </View>
                    </View>
                  {/* END TO SETUP COLOR VIEW */}

                  {/* BEGIN TO SETUP ADDTOBAG VIEW */}
                    <TouchableOpacity style={styles.row_addto_bagbtn} onPress={() => this._handleBagNavigation()}>
                      <Text style={styles.footer_btn_txt}>Add to Bag</Text>
                    </TouchableOpacity>
                  {/* END TO SETUP ADDTOBAG VIEW */}
                  </View>

                {/* BEGIN TO SETUP DROPDOWN VIEW */}
                  {this.state.selectedLots == item.id ? (
                    <View>
                      {this.state.isDroDownOpen == true ? (
                        <View style={styles.list_drop_down}>
                          {item.size.map((itemSize, index) => {
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  this._handleDropDownClick(itemSize.value)
                                }
                                key={index}
                              >
                                <Text>{itemSize.value}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                {/* END TO SETUP DROPDOWN VIEW */}
                </TouchableOpacity>

                {/* BEGIN TO SETUP DIVIDERLINE VIEW */}
                  <View style={item.id === ProductData.length ? null : styles.list_divider}/>
                {/* END TO SETUP DIVIDERLINE VIEW */}
              </View>
            );
          })}
        </Content>

        <View style={styles.divider} />
        {/* BEGIN TO SETUP FOOTER ADDALLBAGS VIEW */}
        <View style={styles.bottom_view}>
          <TouchableOpacity style={styles.footer_btn_bg} onPress={() => this._handleBagNavigation()}>
            <Text style={styles.footer_btn_txt}>Add all to Bag</Text>
          </TouchableOpacity>
        </View>
        {/* END TO SETUP FOOTER ADDALLBAGS VIEW */}
      </Container>
    );
  }
}

// BEGIN TO MAKE STYLE
const styles = StyleSheet.create({
  container: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      backgroundColor: 'white'
  },
  header: {
    backgroundColor: "#ff6347",
		height: Dimensions.get("window").height * 0.1,
		borderBottomWidth: 0,
    ...Platform.select({
      ios: {
				paddingTop: (Dimensions.get("window").height * 0.02),
			},
      android: {
        paddingTop: Dimensions.get("window").width * 0.04
      }
    }),
		elevation: 0,
		paddingLeft: (Dimensions.get("window").width * 0.05),
		paddingRight: (Dimensions.get("window").width * 0.05),
  },
  left: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  body: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  text_title: {
    color: 'white',
    fontSize: moderateScale(18),
    alignSelf: 'center',
		fontFamily: font_type.FontBold,
  },
  right: {
    flex: 1,
    alignItems: 'center',
  },
  bag_icon: {
		marginLeft: Dimensions.get("window").width * 0.04,
		color: 'white',
	},
  heart_icon: {
		color: 'white',
		alignSelf: 'center'
	},
  heart_bg: {
		width: Dimensions.get("window").width * 0.054,
		height: Dimensions.get("window").width * 0.054,
		borderRadius: Dimensions.get("window").width * 0.027,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
    marginRight: Dimensions.get("window").width * 0.032
	},
  bottom_view: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.089,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    backgroundColor: "#d8d8d8",
    height: Dimensions.get("window").height * 0.001,
    width: Dimensions.get("window").width
  },
  footer_btn_bg: {
    width: Dimensions.get("window").width * 0.92,
    alignSelf: 'center',
    backgroundColor: "#ff6347",
    paddingTop: Dimensions.get("window").width * 0.025,
    paddingBottom: Dimensions.get("window").width * 0.025,
    borderRadius: 5
  },
  footer_btn_txt: {
    color: 'white',
    fontSize: moderateScale(16),
    textAlign: 'center'
  },
  row_bg: {
    width: Dimensions.get("window").width * 0.92,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: Dimensions.get("window").width * 0.04,
    marginBottom: Dimensions.get("window").width * 0.04,
  },
  product_image: {
    width: Dimensions.get("window").width * 0.44,
  },
  product_detail_bg: {
    width: Dimensions.get("window").width * 0.44,
    marginLeft: Dimensions.get("window").width * 0.04,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  heart_list_icon :{
    alignSelf: 'flex-end',
    marginTop: Dimensions.get("window").width * 0.025,
    marginRight: Dimensions.get("window").width * 0.025
  },
  product_title_txt: {
    color: "#0e1130",
    fontSize: moderateScale(16),
    textAlign: 'left'
  },
  price_txt: {
    color: "#ff0000",
    fontSize: moderateScale(16),
  },
  detail_field_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list_drop_down: {
    width: Dimensions.get("window").width * 0.22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 90
  },
  list_color_bg: {
    width: Dimensions.get("window").width * 0.22,
    height: 20,
    paddingTop: Dimensions.get("window").width * 0.01
  },
  color_viewer: {
    height: Dimensions.get("window").width * 0.04,
    width: Dimensions.get("window").width * 0.04,
    borderRadius: 3,
    borderWidth: 2
  },
  row_addto_bagbtn: {
    width: Dimensions.get("window").width * 0.44,
    backgroundColor: "#ff6347",
    paddingTop: Dimensions.get("window").width * 0.02,
    paddingBottom: Dimensions.get("window").width * 0.02,
    borderRadius: 5,
  },
  list_divider: {
    width: Dimensions.get("window").width * 0.96,
    marginLeft: Dimensions.get("window").width * 0.04,
    height: 1,
    backgroundColor: "#d8d8d8"
  },
  dropstyle: {
    backgroundColor: 'transparent',
    width: moderateScale(75),
    height: moderateScale(28),
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    borderRadius: 4,
  },
});
// END TO MAKE STYLE
