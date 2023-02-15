import { StyleSheet } from 'react-native'
import { colors } from '../../utils/Colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  titleContent: {
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
    color: colors.white,
  },
  signup: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    color: colors.white,
  },
  underlineTitle: {
    borderBottomWidth: 4,
    borderColor: colors.primaryOrange,
  },
  inputContent: {
    flex: 2,
  },
  text: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  errorText: {
    color: colors.red,
    marginLeft: 25,
    marginBottom: 10,
  },
  inputPassword: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.gray,
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
    backgroundColor: colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
  },
  buttonLogin: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPass: {
    color: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.white,
    margin: 10,
    fontSize: 15,
  },
  TermsOfServices: {
    color: colors.white,
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },
})
