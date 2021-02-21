import {StyleSheet} from 'react-native';
import {Metrics, ApplicationStyles} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  mainContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    paddingTop: 16,
    flex: 1,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  adver: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  adverText: {
    marginTop: 12,
    fontSize: 12,
    position: 'absolute',
    right: 12,
    top: -6,
    textAlign: 'right',
  },
  centered: {
    alignItems: 'center',
  },
  textStyle: {
    paddingRight: 16,
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    lineHeight: 25,
    fontFamily: 'ProximaNovaExtraBold',
  },
  textStyleWhite: {
    paddingRight: 16,
    fontSize: 15,
    color: 'white',
    fontWeight: '700',
    lineHeight: 25,
    fontFamily: 'ProximaNovaExtraBold',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  offerCard: {
    borderRadius: 20,
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonStyleOrder: {
    marginTop: 16,
    margin: -16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonTextOrder: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 50,
    color: 'white',
    fontFamily: 'ProximaNovaExtraBold',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
  },
  filterTitle: {
    marginLeft: 16,
    fontSize: 15,
    lineHeight: 24,
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
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  filterTitleModal: {
    fontWeight: 'bold',
    marginVertical: 16,
  },
  activeBtn: {
    color: 'white',
    backgroundColor: '#1e793c',
  },
  bankLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  inputRow: {
    marginHorizontal: 16,
  },
  inputAndRadio: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
  textInput: {
    width: 100,
    height: 50,
    padding: 16,
    marginRight: 16,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textInputSum: {
    width: '100%',
  },
  error: {
    color: '#c30000',
    position: 'absolute',
    width: 200,
    bottom: -18,
  },
  errorInput: {
    borderColor: '#c30000',
  },
  typeBtn: {
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 8,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 8,
    width: '70%',
    justifyContent: 'flex-end',
  },
  translatedText: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 16,
  },
  submitContainer: {
    padding: 16,
  },
  submitBtn: {
    borderRadius: 8,
    backgroundColor: '#1e793c',
    padding: 16,
  },
  textCenter: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  radio: {
    marginLeft: 16,
    width: 80,
    alignItems: 'center',
  },
  resultContainerTitleText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  resultContainerTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  resultContainerValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionIcon: {
    width: 20,
    height: 20,
    marginTop: 16,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  mainImage: {
    marginRight: 16,
  },
  roundImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 90,
    backgroundColor: '#1e793c',
    marginRight: 16,
    padding: 8,
  },
  disclaimerText: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 16,
  },
  activeBtnText: {
    color: 'white',
  },
  roundImage: {
    width: 24,
    height: 24,
  },
});
