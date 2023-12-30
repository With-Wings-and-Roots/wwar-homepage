'use client';

const ScrollToElementButton = ({ elementId, className, children }) => {
  const scrollToElement = () => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 46; /*header height*/

      window.scroll({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button onClick={scrollToElement} className={className}>
      {children}
    </button>
  );
};

export default ScrollToElementButton;
