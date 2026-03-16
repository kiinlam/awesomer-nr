import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
  // theme
  // background
  bg_light: {
    backgroundColor: 'white',
  },
  bg_dark: {
    backgroundColor: '#010101',
  },
  bg_primary: {
    backgroundColor: '#121212',
  },
  bg_secondary: {
    backgroundColor: '#232323',
  },
  bg_minor: {
    backgroundColor: '#343434',
  },
  bg_darkgray: {
    backgroundColor: '#454545',
  },
  bg_gray: {
    backgroundColor: '#676767',
  },
  bg_lightgray: {
    backgroundColor: '#898989',
  },
  bg_tomato: {
    backgroundColor: 'tomato',
  },
  // color
  primary: {
    color: '#00bbf9',
  },
  minor: {
    color: '#565656',
  },
  lightgray: {
    color: '#d3d3d3',
  },
  darkgray: {
    color: '#545454',
  },
  dark: {
    color: 'black',
  },
  light: {
    color: 'white',
  },
  tomato: {
    color: 'tomato',
  },
  success: {
    color: '#0ead69',
  },
  warn: {
    color: '#e4b61a',
  },

  // position
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  inset: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottom_0: {
    bottom: 0,
  },
  top_16: {
    top: 16,
  },
  bottom_16: {
    bottom: 16,
  },
  left_16: {
    left: 16,
  },
  right_16: {
    right: 16,
  },
  z_1: {
    zIndex: 1,
  },
  z_10: {
    zIndex: 10,
  },

  // layout
  hidden: {
    display: 'none',
  },
  flex: {
    display: 'flex',
  },
  shrink_1: {
    flexShrink: 1,
  },
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  flex_3: {
    flex: 3,
  },
  flex_4: {
    flex: 4,
  },
  flex_5: {
    flex: 5,
  },
  place_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  justify_start: {
    justifyContent: 'flex-start',
  },
  justify_center: {
    justifyContent: 'center',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  justify_arround: {
    justifyContent: 'space-around',
  },
  justify_evenly: {
    justifyContent: 'space-evenly',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  items_start: {
    alignItems: 'flex-start',
  },
  items_center: {
    alignItems: 'center',
  },
  items_end: {
    alignItems: 'flex-end',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_row: {
    flexDirection: 'row',
  },
  flex_col: {
    flexDirection: 'column',
  },
  gap_1: {
    gap: 1,
  },
  gap_4: {
    gap: 4,
  },
  gap_8: {
    gap: 8,
  },
  gap_16: {
    gap: 16,
  },
  gap_18: {
    gap: 18,
  },
  gap_24: {
    gap: 24,
  },
  gap_32: {
    gap: 32,
  },

  // margin
  m_0: {
    margin: 0,
  },
  m_5: {
    margin: 5,
  },
  m_16: {
    margin: 16,
  },
  mt_8: {
    marginTop: 8,
  },
  mb_8: {
    marginBottom: 8,
  },
  mt_16: {
    marginTop: 16,
  },
  mb_16: {
    marginBottom: 16,
  },
  ml_16: {
    marginLeft: 16,
  },
  mr_16: {
    marginRight: 16,
  },
  mb_24: {
    marginBottom: 24,
  },

  // padding
  p_0: {
    padding: 0,
  },
  p_1: {
    padding: 1,
  },
  p_5: {
    padding: 5,
  },
  p_8: {
    padding: 8,
  },
  p_10: {
    padding: 10,
  },
  p_16: {
    padding: 16,
  },
  p_20: {
    padding: 20,
  },
  p_24: {
    padding: 24,
  },
  pt_8: {
    paddingTop: 8,
  },
  pb_8: {
    paddingBottom: 8,
  },
  pl_8: {
    paddingLeft: 8,
  },
  pb_24: {
    paddingBottom: 24,
  },

  // width
  w_32: {
    width: 32,
  },
  w_48: {
    width: 48,
  },
  w_64: {
    width: 64,
  },
  w_128: {
    width: 128,
  },
  w_192: {
    width: 192,
  },
  w_auto: {
    width: 'auto',
  },
  w_full: {
    width: '100%',
  },
  min_w_full: {
    minWidth: '100%',
  },

  // height
  h_8: {
    height: 8,
  },
  h_18: {
    height: 18,
  },
  h_24: {
    height: 24,
  },
  h_32: {
    height: 32,
  },
  h_48: {
    height: 48,
  },
  h_52: {
    height: 52,
  },
  h_64: {
    height: 64,
  },
  h_128: {
    height: 128,
  },
  h_256: {
    height: 256,
  },
  h_auto: {
    height: 'auto',
  },
  h_full: {
    height: '100%',
  },
  min_h_full: {
    minHeight: '100%',
  },

  // font
  font_12: {
    fontSize: 12,
  },
  font_13: {
    fontSize: 13,
  },
  font_14: {
    fontSize: 14,
  },
  font_16: {
    fontSize: 16,
  },
  font_18: {
    fontSize: 18,
  },
  font_20: {
    fontSize: 20,
  },
  font_24: {
    fontSize: 24,
  },
  font_bold: {
    fontWeight: 'bold',
  },
  text_center: {
    textAlign: 'center',
  },
  text_underline: {
    textDecorationLine: 'underline',
  },
  line_through: {
    textDecorationLine: 'line-through',
  },
  italic: {
    fontStyle: 'italic',
  },

  // border
  bordered: {
    borderWidth: 1,
    borderColor: '#343434',
  },
  border_0: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  border_top: {
    borderTopWidth: 1,
    borderTopColor: '#343434',
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#343434',
  },
  border_left: {
    borderLeftWidth: 1,
    borderLeftColor: '#343434',
  },
  border_right: {
    borderRightWidth: 1,
    borderRightColor: '#343434',
  },

  // border radius
  rounded: {
    borderRadius: '50%',
  },
  rounded_8: {
    borderRadius: 8,
  },

  // opacity
  opacity_30: {
    opacity: 0.3,
  },
});

export default css;
