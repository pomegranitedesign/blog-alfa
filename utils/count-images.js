export default function countImages(html) {
  if (!html) {
    return 0;
  }
  // protect against Handlebars.SafeString
  if (html.hasOwnProperty('string')) {
    html = html.string;
  }
  return (html.match(/<img(.|\n)*?>/g) || []).length;
}
