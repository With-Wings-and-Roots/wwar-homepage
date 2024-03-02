export function getHexForColorString(colorString) {
  let result = '#E07614';
  switch (colorString) {
    case 'rose':
    case 'red':
      result = '#E72939';
      break;
    case 'orane':
      result = '#E07614';
      break;
    case 'yolk_yellow':
    case 'yellow':
      result = '#FFC122';
      break;
    case 'mint':
    case 'green':
      result = '#10EFFF';
      break;
    case 'sky_blue':
    case 'blue':
      result = '#0084FF';
      break;
    case 'indigo':
      result = '#1000CF';
      break;
    case 'raspberry':
    case 'violet':
      result = '#E816C6';
      break;
    case 'black':
      result = '#000000';
      break;
  }
  return result;
}
