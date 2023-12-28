const WysiwygContent = ({ content, ...otherProps }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} {...otherProps} />;
};

export default WysiwygContent;
