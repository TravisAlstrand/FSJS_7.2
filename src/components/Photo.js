const Photo = ({ data }) => {

  return (
    <>
      <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} alt={data.title} />
    </>
  );
};

export default Photo;