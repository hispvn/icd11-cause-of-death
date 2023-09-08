import {
    Empty, Button
  } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const Nodata = ({ data }) => <Empty description={
        <span>
            <strong>Not Found Data</strong><br />
            { data.data.message.map( m => <div>{m}</div> ) }
        </span>
    } >
        <Button 
            type='primary'
            onClick={ () => { window.location.href = "../../../dhis-web-maintenance/"; }}
        >
            Create Now
        </Button>
    </Empty>


export default Nodata;
