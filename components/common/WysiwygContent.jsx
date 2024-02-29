const WysiwygContent = ({ content, className = '', ...otherProps }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content || '' }}
      {...otherProps}
      className={`WysiwygContent ${className}`}
    />
  );
};

export default WysiwygContent;
