import ReactLoading from 'react-loading';

const Loading = ({color, height, width}) => {
    return (
        <div className=' flex justify-center'>
            <ReactLoading type={'spin'} color={color} height={height} width={width} />
        </div>
    );
}

export default Loading;
