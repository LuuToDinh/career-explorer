import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import {Typography}  from '@mui/material';

const DataEmptyPage=()=>{
    return (
        <>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <SmsFailedTwoToneIcon style={{ fontSize: '100px' }} />
                <Typography>Dữ liệu đã xóa hoặc không tồn tại</Typography>
              </div>
            </>
    )
}
export default DataEmptyPage;
