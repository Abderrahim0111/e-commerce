import ReactLoading from 'react-loading';

// eslint-disable-next-line react/prop-types
const Loading = ({color, height, width}) => {
    return (
        <div className=' flex justify-center'>
            <ReactLoading type={'spin'} color={color} height={height} width={width} />
        </div>
    );
}

export default Loading;
