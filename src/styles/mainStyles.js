import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

export const StyledButton = styled(Button)`
  && {
    display: flex;
    background: CADETBLUE;
    border-radius: 3px;
    border: 1px solid black;
    color: #fff;
    height: 48px;
    padding: 0 30px;
    margin-top: 20px;
    width: 170px;
    margin 40px auto 0;
  }
`
export const SButton = styled(StyledButton)`
  && {
    display: flex;
    background: lightBlue;
    color: cadetblue
    border-color: cadetblue
    margin-right: 15px
  }
`
export const SmButton = styled(StyledButton)`
  && {
    background: lightBlue;
    color: cadetblue
    border-color: cadetblue
    margin:0 auto
    height: 10px
    width: 100px
  }
`
export const StyledSelect = styled(Select)`
  && {
    width: 75px;
    margin: 0 auto;
    margin-top: 5px;
  }
`
export const StyledFormHelperText = styled(FormHelperText)`
  && {
    width: 75px;
    margin: 3px auto;
    margin-bottom: 5px;
  }
`
export const StyledTextField = styled(TextField)`
  && {
    margin: 10px 20px;
  }
`
export const SmallTextField = styled(TextField)`
  && {
    margin-right: 10px;
    width: 85px;
    color: blue;
  }
`
export const StyledFormControl = styled(FormControl)`
  && {
    
  }
`
export const StyledMenuItem = styled(MenuItem)`
  && {
  }
`
