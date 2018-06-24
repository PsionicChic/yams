import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

export const StyledList = styled(List)`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    padding-top: 7px;
  }
`
export const StyledListItem = styled(ListItem)`
  && {
    width: 185px;
    text-align: center;
    padding: 0;
  }
`
export const StyledListItemText = styled(ListItemText)`
  &&& {
    padding: 0;
    font-weight: ${props => (props.primary ? '500' : '400')};
    color: ${props => (props.primary ? 'white' : 'palevioletred')};
  }
`
export const StyledGrid = styled(Grid)`
  && {
    margin: 0 auto;
    text-align: center;
  }
`
export const StyledListItemIcon = styled(ListItemIcon)`
  && {
  }
`
