const WysiwygContent = ({ content, ...otherProps }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      {...otherProps}
      className='WysiwygContent'
    />
  );
};

export default WysiwygContent;
