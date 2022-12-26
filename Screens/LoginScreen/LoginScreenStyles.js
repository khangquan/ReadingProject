import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE6BE',
  },
  content: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 15,
    color: 'white',
  },
  signup: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'white',
  },
  inputContent: {
    flex: 2,
  },
  text: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginLeft: 25,
    marginBottom: 10,
  },
  inputPassword: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'gray',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 0,
  },
  buttonContent: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoginWrapper: {
    width: '90%',
    backgroundColor: '#FB7849',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
  },
  buttonLogin: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPass: {
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    margin: 10,
    fontSize: 15,
  },
  TermsOfServices: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },
})
