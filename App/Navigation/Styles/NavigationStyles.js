import {StyleSheet, Platform} from 'react-native';
import * as DeviceInfo from 'react-native-device-info';

const StatusBarHeightIos = DeviceInfo.hasNotch() ? 30 : 20;
const StatusBarHeight = Platform.OS === 'ios' ? StatusBarHeightIos : 0;

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 120 - StatusBarHeight : 65,
    paddingTop: StatusBarHeight,
    backgroundColor: '#1e793c',
  },
  logoTitle: {
    marginLeft: 16,
    fontSize: 20,
    color: 'white',
  },
  logoStyle: {
    marginLeft: 16,
    width: 100,
    resizeMode: 'contain',
  },
  world: {
    marginRight: 16,
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  modal: {
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: '60%',
    backgroundColor: '#FFF',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  listContainerTwoCol: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 40,
  },
  countyTitleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  countryImg: {
    width: 30,
    height: 30,
    marginRight: 16,
    resizeMode: 'contain',
  },
  countyTitle: {
    fontSize: 15,
    lineHeight: 24,
  },
});
