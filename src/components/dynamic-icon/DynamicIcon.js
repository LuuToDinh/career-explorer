import  * as MuiIcon from '@mui/icons-material'

const DynamicIcon=({name})=> {
    
    const Icon = MuiIcon[name];
    return <Icon />;
  }
export default DynamicIcon