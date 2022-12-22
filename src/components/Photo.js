const Photo = ({ data }) => {

  return (
    <li>
      <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`} alt={data.title} />
    </li>
  );
};

export default Photo;